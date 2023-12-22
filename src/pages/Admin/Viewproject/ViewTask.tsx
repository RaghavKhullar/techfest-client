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
  FileInput,
} from "@mantine/core";
import { SubTaskCard } from "../../../components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { showNotification } from "../../../helpers/helpers";
import { addSubTask, fetchSubTasksForTask } from "../../../helpers/apiCalls";
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
  IconFileTypePdf,
  IconProgress,
  IconShieldHalfFilled,
} from "@tabler/icons-react";
import { priorityMap } from "../../../utils/utils";

const Home = () => {
  const { projectId, taskId } = useParams();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>("all");
  const [sortFilter, setSortFilter] = useState<string>("default");
  const [subtaskResponse, setSubtaskResponse] =
    useState<SubTasksOfProjectResponse>({
      projectName: "",
      projectId: "",
      taskId: "",
      taskName: "",
      subTasks: [],
    });
  const [currSubTasks, setCurrSubTasks] = useState<SubTaskResponse[]>([]);
  const [isModalOpen, { open, close }] = useDisclosure(false);

  const addSubTaskForm = useForm<{
    name: string;
    description: string;
    deadline: Date;
    priority: string;
    document: File | undefined;
  }>({
    initialValues: {
      name: "",
      description: "",
      deadline: new Date(),
      priority: priorityMap.LOW.toString(),
      document: undefined,
    },

    validate: {
      name: (value) => (value.length > 0 ? null : "Invalid task name"),
      description: (value) => (value.length > 0 ? null : "Invalid description"),
    },
  });

  const submitSubTaskForm = async () => {
    if (
      addSubTaskForm.values.description.length == 0 ||
      addSubTaskForm.values.name.length == 0
    ) {
      showNotification("Error", "Invalid parameters", "error");
      return;
    }

    try {
      const response = await addSubTask({
        name: addSubTaskForm.values.name,
        description: addSubTaskForm.values.description,
        deadline: addSubTaskForm.values.deadline,
        projectId: projectId,
        taskId: taskId,
        priority: parseInt(addSubTaskForm.values.priority),
        file: addSubTaskForm.values.document,
      });
      if (response.status === 200) {
        showNotification("Success", response.data.message, "success");
        fetchSubTasksOfProject(projectId as string, taskId as string);
        addSubTaskForm.reset();
        close();
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
  const fetchSubTasksOfProject = async (projectId: string, taskId: string) => {
    try {
      const response = await fetchSubTasksForTask(projectId, taskId);
      if (response.status === 200) {
        setSubtaskResponse(response.data.data);
      } else {
        showNotification("Error", response.data.message, "error");
        navigate("/admin/project/" + projectId);
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
      showNotification("Warning", "Invalid project", "warning");
      navigate("/admin/viewProject");
      return;
    } else if (taskId == undefined || taskId == "undefined") {
      showNotification("Warning", "Invalid selected task", "warning");
      navigate("/admin/project/" + projectId);
      return;
    }
    fetchSubTasksOfProject(projectId, taskId);
  }, [projectId, taskId]);

  useEffect(() => {
    let arr = [];
    if (filter != "all") {
      arr = subtaskResponse.subTasks.filter(
        (subTask) => subTask.status == filter
      );
    } else {
      arr = subtaskResponse.subTasks.filter(() => true);
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
    setCurrSubTasks(arr);
  }, [subtaskResponse.subTasks, filter, sortFilter]);

  return (
    <>
      {subtaskResponse && subtaskResponse.projectId.length > 0 && (
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
                  label="Add name of the sub task"
                  placeholder="John Doe"
                  {...addSubTaskForm.getInputProps("name")}
                />
                <TextInput
                  withAsterisk
                  label="Add description of the sub task"
                  placeholder="yours@gmail.com"
                  className="mt-[10px]"
                  {...addSubTaskForm.getInputProps("description")}
                />

                <DatePickerInput
                  valueFormat="DD-MM-YYYY"
                  className="w-full mt-[10px]"
                  label="Deadline"
                  {...addSubTaskForm.getInputProps("deadline")}
                />
                <Flex className="mt-[10px] justify-between">
                  <FileInput
                    className={
                      addSubTaskForm.values.document != undefined
                        ? "w-[70%]"
                        : "w-[100%]"
                    }
                    label="Upload the pdf file"
                    leftSection={<IconFileTypePdf />}
                    accept="application/pdf"
                    {...addSubTaskForm.getInputProps("document")}
                    clearable
                  />
                  {addSubTaskForm.values.document != undefined ? (
                    <Button
                      className="self-end"
                      href={URL.createObjectURL(addSubTaskForm.values.document)}
                      target="_blank"
                      component="a"
                    >
                      Preview
                    </Button>
                  ) : (
                    <></>
                  )}
                </Flex>
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
                    {...addSubTaskForm.getInputProps("priority")}
                  />
                </Flex>
                <Group justify="center" mt="md">
                  <Button type="submit" onClick={submitSubTaskForm}>
                    Add subtask
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
          <Center className="mb-[20px] mt-[20px]">
            <Text className="text-3xl">
              Project: {subtaskResponse.projectName}
            </Text>
          </Center>
          <Center className="mb-[20px]">
            <Text className="text-3xl">Task: {subtaskResponse.taskName}</Text>
          </Center>
          <Center>
            <Button onClick={open}> Add a new subtask</Button>
          </Center>
        </>
      )}

      <Flex wrap="wrap" justify="space-around">
        {subtaskResponse.subTasks.length > 0 &&
          currSubTasks.map((val, i) => {
            return (
              <SubTaskCard
                subTask={val}
                projectId={subtaskResponse.projectId}
                projectName={subtaskResponse.projectName}
                taskName={subtaskResponse.taskName}
                taskId={subtaskResponse.taskId}
                key={i}
                fetchSubTasksOfProject={fetchSubTasksOfProject}
              />
            );
          })}
      </Flex>
    </>
  );
};

export default Home;
