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
import { editProject, removeProject } from "../../helpers/apiCalls";
import { Link, useNavigate } from "react-router-dom";
import { getFormattedDate, getPriority } from "../../utils/utils";
import { DatePickerInput } from "@mantine/dates";
import {
  IconArrowBigDownLinesFilled,
  IconArrowBigUpLinesFilled,
  IconBrandMedium,
  IconCalendarDue,
  IconClearAll,
  IconDiscountCheckFilled,
  IconProgress,
  IconTrash,
  IconEdit,
  IconEye,
  IconFlag3Filled,
} from "@tabler/icons-react";
import { useForm } from "@mantine/form";

const EditProjectModal = ({
  project,
  isEditModalOpen,
  editClose,
  fetchProjects,
}: {
  project: AllProjectResponse;
  isEditModalOpen: boolean;
  editClose: () => void;
  fetchProjects: () => Promise<void>;
}) => {
  const navigate = useNavigate();

  const submitProjectForm = async () => {
    if (
      addProjectForm.values.description.length == 0 ||
      addProjectForm.values.name.length == 0
    ) {
      showNotification("Error", "Invalid parameters", "error");
      return;
    }
    try {
      const response = await editProject({
        name: addProjectForm.values.name,
        description: addProjectForm.values.description,
        deadline: addProjectForm.values.deadline,
        priority: parseInt(addProjectForm.values.priority),
        projectId: project.id,
        status: addProjectForm.values.status,
      });
      if (response.status === 200) {
        showNotification("Success", response.data.message, "success");
        fetchProjects();
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
  const addProjectForm = useForm<{
    name: string;
    description: string;
    deadline: Date;
    priority: string;
    status: string;
  }>({
    initialValues: {
      name: project.name,
      description: project.description,
      deadline: new Date(project.deadline),
      priority: project.priority.toString(),
      status: project.status,
    },

    validate: {
      name: (value) => (value.length > 0 ? null : "Invalid Project name"),
      description: (value) => (value.length > 0 ? null : "Invalid description"),
    },
  });
  return (
    <Modal
      opened={isEditModalOpen}
      onClose={editClose}
      title="Edit project"
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
            label="Add name of the Project"
            placeholder="John Doe"
            {...addProjectForm.getInputProps("name")}
          />
          <TextInput
            withAsterisk
            label="Add description of the Project"
            placeholder="yours@gmail.com"
            className="mt-[10px]"
            {...addProjectForm.getInputProps("description")}
          />

          <DatePickerInput
            valueFormat="DD-MM-YYYY"
            className="w-full mt-[10px]"
            label="Deadline"
            {...addProjectForm.getInputProps("deadline")}
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
              {...addProjectForm.getInputProps("priority")}
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
              {...addProjectForm.getInputProps("status")}
            />
          </Flex>

          <Group justify="space-evenly" mt="md">
            <Button type="submit" onClick={addProjectForm.reset}>
              Reset form
            </Button>
            <Button type="submit" onClick={submitProjectForm}>
              Edit Project
            </Button>
          </Group>
        </Box>
      </Box>
    </Modal>
  );
};
const ProjectCard = ({
  project,
  fetchProjects,
}: {
  project: AllProjectResponse;
  fetchProjects: () => Promise<void>;
}) => {
  const isMobile = useMediaQuery("max-width:600px");
  const [isModalOpen, { open, close }] = useDisclosure(false);
  const [isDeleteModelOpen, { open: delOpen, close: delClose }] =
    useDisclosure(false);
  const [isEditModalOpen, { open: editOpen, close: editClose }] =
    useDisclosure(false);
  const navigate = useNavigate();
  const deleteProject = async () => {
    try {
      const response = await removeProject(project.id);
      if (response.status === 200) {
        showNotification("Success", response.data.message, "success");
        close();
        delClose();
        fetchProjects();
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
      navigate("/login");
      return;
    }
  };
  return (
    <>
      <Card
        shadow="xl"
        padding="sm"
        className={`${
          !isMobile ? "w-[25%]" : "w-full"
        } transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 drop-shadow-md m-[1rem] min-h-[15vh]`}
      >
        <Flex className="justify-between">
          <Text size="md" tt="uppercase" fw={700}>
            {project.name}
          </Text>
          <Flex className="gap-x-2">
            <Button
              component={Link}
              size="compact-sm"
              to={"/admin/project/" + project.id}
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
            {project.description.length > 0
              ? project.description
              : "No description"}
          </Text>
        </Flex>
        <Flex>
          <IconFlag3Filled
            style={{
              color:
                project.priority === 0
                  ? "green"
                  : project.priority === 1
                    ? "yellow"
                    : project.priority === 2
                      ? "red"
                      : "gray",
            }}
          />
          {getPriority(project.priority)}
        </Flex>
        <Flex>
          <Text>Deadline :{getFormattedDate(new Date(project.deadline))}</Text>
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
        title={project.name}
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Flex className="flex-col">
          <Flex>
            <Text size="md">
              {project.description.length > 0
                ? project.description
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
                  project.priority === 0
                    ? "green"
                    : project.priority === 1
                      ? "yellow"
                      : project.priority === 2
                        ? "red"
                        : "gray",
              }}
            />
            {getPriority(project.priority)}
          </Flex>
          <Flex>
            <Text size="md">
              Deadline :{getFormattedDate(new Date(project.deadline))}
            </Text>
          </Flex>
        </Flex>
        <Group>
          <Flex direction="column">
            <Text fw={300} key={0}>
              Tasks:
            </Text>
            {project.childTasks.map((task, i) => {
              return (
                <>
                  <Text className="pl-5" size="sm" key={i + 1}>
                    {i + 1 + ". " + task.name}
                  </Text>
                </>
              );
            })}
          </Flex>
        </Group>
        <Flex className="w-1/1 gap-x-4 justify-self-center" justify="center">
          <Button onClick={delOpen} color="red">
            <IconTrash />
          </Button>
          <Button onClick={editOpen}>
            <IconEdit />
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
        <Text className="text-3xl">Warning! {project.name}</Text>
        <Text className="text-lg">
          Are you sure you want to delete this project? It will remove all the
          tasks and sub-tasks
        </Text>
        <Flex className="mt-[20px] justify-evenly">
          <Button onClick={deleteProject}> Yes</Button>
          <Button onClick={delClose}> No</Button>
        </Flex>
      </Modal>
      <EditProjectModal
        project={project}
        isEditModalOpen={isEditModalOpen}
        editClose={editClose}
        fetchProjects={fetchProjects}
      />
    </>
  );
};

export default ProjectCard;
