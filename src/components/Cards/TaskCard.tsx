import {
  Avatar,
  Box,
  Button,
  Card,
  Center,
  Flex,
  Group,
  Modal,
  SegmentedControl,
  Text,
  TextInput,
} from "@mantine/core";
import { useMediaQuery, useDisclosure } from "@mantine/hooks";
import { showNotification } from "../../helpers/helpers";
import { editTask, removeTask } from "../../helpers/apiCalls";
import { Link, useNavigate } from "react-router-dom";
import { getFormattedDate, getPriority } from "../../utils/utils";
import { useForm } from "@mantine/form";
import { DatePickerInput } from "@mantine/dates";
import {
  IconArrowBigDownLinesFilled,
  IconArrowBigUpLinesFilled,
  IconBrandMedium,
  IconCalendarDue,
  IconDiscountCheckFilled,
  IconProgress,
  IconTrash,
  IconEdit,
  IconEye,
  IconFlag3Filled,
} from "@tabler/icons-react";

const EditTaskModel = ({
  isEditModalOpen,
  editClose,
  task,
  projectId,
  fetchTasksOfProject,
}: {
  isEditModalOpen: boolean;
  editClose: () => void;
  task: AllProjectResponse;
  projectId: string;
  fetchTasksOfProject: (id: string) => Promise<void>;
}) => {
  const navigate = useNavigate();
  const addTaskForm = useForm<{
    name: string;
    description: string;
    deadline: Date;
    priority: string;
    status: string;
  }>({
    initialValues: {
      name: task.name,
      description: task.description,
      deadline: new Date(task.deadline),
      priority: task.priority.toString(),
      status: task.status,
    },

    validate: {
      name: (value) => (value.length > 0 ? null : "Invalid task name"),
      description: (value) => (value.length > 0 ? null : "Invalid description"),
    },
  });

  const submitTaskForm = async () => {
    if (
      addTaskForm.values.description.length == 0 ||
      addTaskForm.values.name.length == 0
    ) {
      showNotification("Error", "Invalid parameters", "error");
      return;
    }

    try {
      const response = await editTask({
        name: addTaskForm.values.name,
        description: addTaskForm.values.description,
        deadline: addTaskForm.values.deadline,
        priority: parseInt(addTaskForm.values.priority),
        status: addTaskForm.values.status,
        taskId: task.id,
      });
      if (response.status === 200) {
        showNotification("Success", response.data.message, "success");
        fetchTasksOfProject(projectId);
        editClose();
        return;
      } else {
        showNotification("Error", response.data.message, "error");
        return;
      }
    } catch {
      showNotification("Error", "Internal server error", "error");
      navigate("/login");
      return;
    }
  };
  return (
    <>
      <Modal
        opened={isEditModalOpen}
        onClose={editClose}
        title="Edit task"
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Box w={"80%"} mx="auto">
          <Box mx="auto">
            <TextInput
              withAsterisk
              label="Add name of the task"
              placeholder="John Doe"
              {...addTaskForm.getInputProps("name")}
            />
            <TextInput
              withAsterisk
              label="Add description of the task"
              placeholder="yours@gmail.com"
              className="mt-[10px]"
              {...addTaskForm.getInputProps("description")}
            />

            <DatePickerInput
              valueFormat="DD-MM-YYYY"
              className="w-full mt-[10px]"
              label="Deadline"
              {...addTaskForm.getInputProps("deadline")}
            />
            <Flex className="w-full flex-col mt-[10px]">
              <Text className="text-sm">Priority</Text>
              <SegmentedControl
                data={[
                  {
                    value: "0",
                    label: (
                      <Center style={{ gap: 10 }}>
                        <IconArrowBigDownLinesFilled />
                        <span>Low</span>
                      </Center>
                    ),
                  },
                  {
                    value: "1",
                    label: (
                      <Center style={{ gap: 10 }}>
                        <IconBrandMedium />
                        <span>Medium</span>
                      </Center>
                    ),
                  },
                  {
                    value: "2",
                    label: (
                      <Center style={{ gap: 10 }}>
                        <IconArrowBigUpLinesFilled />
                        <span>High</span>
                      </Center>
                    ),
                  },
                ]}
                transitionDuration={200}
                transitionTimingFunction="linear"
                {...addTaskForm.getInputProps("priority")}
              />
            </Flex>
            <Flex className="w-full flex-col mt-[10px]">
              <Text className="text-sm">Status</Text>
              <SegmentedControl
                data={[
                  {
                    value: "todo",
                    label: (
                      <Center style={{ gap: 10 }}>
                        <IconCalendarDue />
                        <span>To-Do</span>
                      </Center>
                    ),
                  },
                  {
                    value: "progress",
                    label: (
                      <Center style={{ gap: 10 }}>
                        <IconProgress />
                        <span>In Progress</span>
                      </Center>
                    ),
                  },
                  {
                    value: "complete",
                    label: (
                      <Center style={{ gap: 10 }}>
                        <IconDiscountCheckFilled />
                        <span>Complete</span>
                      </Center>
                    ),
                  },
                ]}
                transitionDuration={200}
                transitionTimingFunction="linear"
                {...addTaskForm.getInputProps("status")}
              />
            </Flex>
            <Group justify="space-evenly" mt="md">
              <Button type="submit" onClick={addTaskForm.reset}>
                Reset form
              </Button>
              <Button type="submit" onClick={submitTaskForm}>
                Edit task
              </Button>
            </Group>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

const TaskCard = ({
  task,
  projectId,
  projectName,
  fetchTasksOfProject,
}: {
  task: AllProjectResponse;
  projectId: string;
  projectName: string;
  fetchTasksOfProject: (id: string) => Promise<void>;
}) => {
  const isMobile = useMediaQuery("max-width:600px");
  const [isModalOpen, { open, close }] = useDisclosure(false);
  const [isDeleteModelOpen, { open: delOpen, close: delClose }] =
    useDisclosure(false);
  const [isEditModalOpen, { open: editOpen, close: editClose }] =
    useDisclosure(false);
  const navigate = useNavigate();
  const deleteTask = async () => {
    try {
      const response = await removeTask({
        projectId: projectId,
        taskId: task.id,
      });
      if (response.status === 200) {
        showNotification("Success", response.data.message, "success");
        close();
        delClose();
        fetchTasksOfProject(projectId);
        return;
      } else {
        showNotification("Error", response.data.message, "error");
        close();
        delClose();
        return;
      }
    } catch {
      close();
      delClose();
      navigate("/admin/viewProject");
      return;
    }
  };
  return (
    <>
      <Card
        shadow="xl"
        padding="xs"
        className={`${
          !isMobile ? "w-[25%]" : "w-full"
        } transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 m-[2rem] drop-shadow-md min-h-[15vh]`}
      >
        <Flex className="justify-between">
          <Text size="md" tt="uppercase" fw={700}>
            {task.name}
          </Text>
          <Flex className="gap-x-2">
            <Button
              size="compact-sm"
              component={Link}
              to={"/admin/task/" + projectId + "/" + task.id}
            >
              <IconEye />
            </Button>
            <Button onClick={open} variant="filled" size="compact-sm">
              Edit
            </Button>
          </Flex>
        </Flex>

        <Flex>
          <Text size="sm">
            {task.description.length > 0 ? task.description : "No description"}
          </Text>
        </Flex>
        <Flex>
          <IconFlag3Filled
            style={{
              color:
                task.priority === 0
                  ? "green"
                  : task.priority === 1
                    ? "yellow"
                    : task.priority === 2
                      ? "red"
                      : "gray",
            }}
          />
          {getPriority(task.priority)}
        </Flex>
        <Flex>
          <Text>Deadline :{getFormattedDate(new Date(task.deadline))}</Text>
        </Flex>
      </Card>
      <Modal
        opened={isModalOpen}
        onClose={() => {
          close();
          if (isDeleteModelOpen) {
            delClose();
          }
          if (isEditModalOpen) {
            editClose();
          }
        }}
        title={task.name}
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Flex className="flex-col">
          <Flex>
            <Text size="md">
              {task.description.length > 0
                ? task.description
                : "No description"}
            </Text>
          </Flex>
          <Flex>
            <Text fw={300} size="md">
              Priority:{" "}
            </Text>
            <IconFlag3Filled
              style={{
                color:
                  task.priority === 0
                    ? "green"
                    : task.priority === 1
                      ? "yellow"
                      : task.priority === 2
                        ? "red"
                        : "gray",
              }}
            />
            {getPriority(task.priority)}
          </Flex>
          <Flex>
            <Text> Deadline :{getFormattedDate(new Date(task.deadline))}</Text>
          </Flex>
        </Flex>
        <Group>
          <Flex direction="column">
            <Text fw={300} size="md">
              Subtasks
            </Text>
            {task.childTasks.map((subTask, i) => {
              return (
                <>
                  <Text className="pl-5" size="sm" key={i}>
                    {i + 1 + ". " + subTask.name}
                  </Text>
                </>
              );
            })}
          </Flex>
        </Group>
        {/* Navigate to project page on click */}
        <Flex className="w-1/1 gap-x-4 justify-self-center" justify="center">
          <Button onClick={delOpen} color="red">
            <IconTrash />
          </Button>
          <Button onClick={editOpen}>
            <IconEdit />
          </Button>
          <Button
            component={Link}
            to={"/admin/task/" + projectId + "/" + task.id}
          >
            <IconEye />
          </Button>
        </Flex>
      </Modal>
      <Modal
        opened={isDeleteModelOpen}
        onClose={() => {}}
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        withCloseButton={false}
      >
        <Text className="text-3xl">Warning! {task.name}</Text>
        <Text className="text-lg">
          Are you sure you want to delete this task? It will remove all the
          sub-tasks
        </Text>
        <Flex className="mt-[20px] justify-evenly">
          <Button onClick={deleteTask}> Yes</Button>
          <Button onClick={delClose}> No</Button>
        </Flex>
      </Modal>
      <EditTaskModel
        isEditModalOpen={isEditModalOpen}
        editClose={editClose}
        projectId={projectId}
        task={task}
        fetchTasksOfProject={fetchTasksOfProject}
      />
    </>
  );
};

export default TaskCard;
