import {
  Box,
  Button,
  Center,
  Flex,
  Group,
  Modal,
  TextInput,
  Text,
  SegmentedControl,
} from "@mantine/core";
import { TaskCard } from "../../../components";
import { useParams, useNavigate } from "react-router-dom";
import { Key, useEffect, useState } from "react";
import { showNotification } from "../../../helpers/helpers";
import { addTask, fetchTasksForProject } from "../../../helpers/apiCalls";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { DatePickerInput } from "@mantine/dates";
import { priorityMap } from "../../../utils/utils";
import {
  IconArrowBigDownLinesFilled,
  IconArrowBigUpLinesFilled,
  IconBrandMedium,
  IconCalendarDue,
  IconClearAll,
  IconDiscountCheckFilled,
  IconProgress,
} from "@tabler/icons-react";

const Home = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [taskResponse, setTaskResponse] = useState<TasksOfProjectResponse>({
    projectId: "",
    projectName: "",
    tasks: [],
  });
  const [filter, setFilter] = useState<string>("all");
  const [isModalOpen, { open, close }] = useDisclosure(false);
  const [currTasks, setcurrTasks] = useState<AllProjectResponse[]>([]);

  const addTaskForm = useForm<{
    name: string;
    description: string;
    deadline: Date;
    priority: string;
  }>({
    initialValues: {
      name: "",
      description: "",
      deadline: new Date(),
      priority: priorityMap.LOW.toString(),
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
      const response = await addTask({
        name: addTaskForm.values.name,
        description: addTaskForm.values.description,
        deadline: addTaskForm.values.deadline,
        projectId: projectId,
        priority: parseInt(addTaskForm.values.priority),
      });
      if (response.status === 200) {
        showNotification("Success", response.data.message, "success");
        navigate("/admin/task/" + projectId + "/" + response.data.data);
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
  const fetchTasksOfProject = async (id: string) => {
    try {
      const response = await fetchTasksForProject(id);
      if (response.status === 200) {
        setTaskResponse(response.data.data);
      } else {
        showNotification("Error", response.data.message, "error");
        navigate("/admin/viewProject");
        return;
      }
    } catch {
      showNotification("Error", "Internal server error", "error");
      navigate("/login");
      return;
    }
  };

  useEffect(() => {
    if (projectId == undefined || projectId == "undefined") {
      showNotification("Warning", "Given project doesn't exist", "warning");
      navigate("/admin/viewProject");
      return;
    }
    fetchTasksOfProject(projectId);
  }, [projectId]);
  useEffect(() => {
    if (filter == "all") {
      setcurrTasks(taskResponse.tasks);
    } else {
      setcurrTasks(taskResponse.tasks.filter((task) => task.status == filter));
    }
  }, [taskResponse.tasks, filter]);
  return (
    <>
      {taskResponse && taskResponse.projectId.length > 0 && (
        <>
          <Modal
            opened={isModalOpen}
            onClose={close}
            title="Add a new project"
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
                <Group justify="center" mt="md">
                  <Button type="submit" onClick={submitTaskForm}>
                    Add task
                  </Button>
                </Group>
              </Box>
            </Box>
          </Modal>
          <Flex className="justify-end">
            <SegmentedControl
              value={filter}
              onChange={setFilter}
              data={[
                {
                  value: "all",
                  label: (
                    <Center style={{ gap: 10 }}>
                      <IconClearAll />
                      <span>All</span>
                    </Center>
                  ),
                },
                {
                  value: "due",
                  label: (
                    <Center style={{ gap: 10 }}>
                      <IconCalendarDue />
                      <span>Due</span>
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
            />
          </Flex>
          <Center className="mb-[20px]">
            <Text className="text-3xl">{taskResponse.projectName}</Text>
          </Center>
          <Center>
            <Button onClick={open}> Add a new task</Button>
          </Center>
        </>
      )}
      <Flex wrap="wrap" justify="space-around">
        {taskResponse.tasks.length > 0 &&
          currTasks.map((task, i) => {
            return (
              <TaskCard
                key={i}
                task={task}
                projectId={taskResponse.projectId}
                projectName={taskResponse.projectName}
                fetchTasksOfProject={fetchTasksOfProject}
              />
            );
          })}
      </Flex>
    </>
  );
};

export default Home;
