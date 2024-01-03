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
import { ChatBoxUiAdmin, ProjectCard } from "../../../components";
import { useEffect, useState } from "react";
import { addProject, fetchAllProjects } from "../../../helpers/apiCalls";
import { showNotification } from "../../../helpers/helpers";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { DatePickerInput } from "@mantine/dates";
import {
  IconArrowBigDownLinesFilled,
  IconArrowBigUpLinesFilled,
  IconBrandMedium,
  IconCalendar,
  IconCalendarClock,
  IconCalendarDue,
  IconClearAll,
  IconDiscountCheckFilled,
  IconProgress,
  IconShieldHalfFilled,
} from "@tabler/icons-react";
import { priorityMap } from "../../../utils/utils";

const Home = () => {
  const [projects, setProjects] = useState<AllProjectResponse[]>([]);
  const [isModalOpen, { open, close }] = useDisclosure(false);
  const [sortFilter, setSortFilter] = useState<string>("default");

  const navigate = useNavigate();
  const addProjectForm = useForm<{
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
      name: (value) => (value.length > 0 ? null : "Invalid Project name"),
      description: (value) => (value.length > 0 ? null : "Invalid description"),
    },
  });
  const [filter, setFilter] = useState<string>("all");
  const [currProjects, setcurrProjects] = useState<AllProjectResponse[]>([]);
  const submitProjectForm = async () => {
    if (
      addProjectForm.values.description.length == 0 ||
      addProjectForm.values.name.length == 0
    ) {
      showNotification("Error", "Invalid parameters", "error");
      return;
    }
    try {
      const response = await addProject({
        name: addProjectForm.values.name,
        description: addProjectForm.values.description,
        deadline: addProjectForm.values.deadline,
        priority: parseInt(addProjectForm.values.priority),
      });
      if (response.status === 200) {
        showNotification("Success", response.data.message, "success");
        navigate("/admin/project/" + response.data.data);
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

  const fetchProjects = async () => {
    try {
      const response = await fetchAllProjects();
      if (response.status === 200) {
        setProjects(response.data.data);
      } else {
        showNotification("Error", response.data.message, "error");
        navigate("/login");
        return;
      }
    } catch {
      showNotification("Error", "Internal server error", "error");
      navigate("/login");
      return;
    }
  };
  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    let arr = [];
    if (filter != "all") {
      arr = projects.filter((subTask) => subTask.status == filter);
    } else {
      arr = projects.filter(() => true);
    }

    if (sortFilter == "priority") {
      arr.sort((a, b) => {
        return b.priority - a.priority;
      });
    } else if (sortFilter == "deadline") {
      arr.sort((a, b) => {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      });
    } else if (sortFilter == "start date") {
      arr.sort((a, b) => {
        return (
          new Date(a.creationTime).getTime() -
          new Date(b.creationTime).getTime()
        );
      });
    }
    setcurrProjects(arr);
  }, [projects, filter, sortFilter]);
  return (
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
            <Group justify="center" mt="md">
              <Button type="submit" onClick={submitProjectForm}>
                Add Project
              </Button>
            </Group>
          </Box>
        </Box>
      </Modal>
      <Flex className="justify-around items-center">
        <Flex className="items-center">
          <Text className="text-lg">Filter Tasks:</Text>
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
          />
        </Flex>
        <Flex className="items-center">
          <Text className="text-lg">Sort By:</Text>
          <SegmentedControl
            value={sortFilter}
            onChange={setSortFilter}
            data={[
              {
                value: "default",
                label: (
                  <Center style={{ gap: 10 }}>
                    <IconClearAll />
                    <span>Default</span>
                  </Center>
                ),
              },
              {
                value: "priority",
                label: (
                  <Center style={{ gap: 10 }}>
                    <IconShieldHalfFilled />
                    <span>Priority</span>
                  </Center>
                ),
              },
              {
                value: "deadline",
                label: (
                  <Center style={{ gap: 10 }}>
                    <IconCalendarClock />
                    <span>Due date</span>
                  </Center>
                ),
              },
              {
                value: "start date",
                label: (
                  <Center style={{ gap: 10 }}>
                    <IconCalendar />
                    <span>Start date</span>
                  </Center>
                ),
              },
            ]}
            transitionDuration={200}
            transitionTimingFunction="linear"
          />
        </Flex>
      </Flex>
      <Center className="mb-[20px]">
        <Text className="text-3xl">All projects</Text>
      </Center>
      <Center>
        <Button onClick={open}> Add a new project</Button>
      </Center>
      <Flex wrap="wrap" justify="space-around">
        {projects.length > 0 &&
          currProjects.map((project: AllProjectResponse, i) => {
            return (
              <ProjectCard
                key={i}
                project={project}
                fetchProjects={fetchProjects}
              />
            );
          })}
      </Flex>
      <ChatBoxUiAdmin delay={1} />
    </>
  );
};

export default Home;
