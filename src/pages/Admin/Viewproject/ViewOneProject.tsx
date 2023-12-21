import {
  Box,
  Button,
  Center,
  Flex,
  Group,
  Modal,
  TextInput,
  Text,
} from "@mantine/core";
import { TaskCard } from "../../../components";
import { useParams, useNavigate } from "react-router-dom";
import { Key, useEffect, useState } from "react";
import { showNotification } from "../../../helpers/helpers";
import { addTask, fetchTasksForProject } from "../../../helpers/apiCalls";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { DatePickerInput } from "@mantine/dates";

const Home = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [taskResponse, setTaskResponse] = useState<TasksOfProjectResponse>({
    projectId: "",
    projectName: "",
    tasks: [],
  });
  const [isModalOpen, { open, close }] = useDisclosure(false);

  const addTaskForm = useForm<{
    name: string;
    description: string;
    deadline: Date;
  }>({
    initialValues: {
      name: "",
      description: "",
      deadline: new Date(),
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

  const arr = [...new Array(10).fill(0)];
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
                  {...addTaskForm.getInputProps("description")}
                />

                <DatePickerInput
                  valueFormat="DD-MM-YYYY"
                  className="w-full"
                  label="Deadline"
                  {...addTaskForm.getInputProps("deadline")}
                />
                <Group justify="center" mt="md">
                  <Button type="submit" onClick={submitTaskForm}>
                    Add task
                  </Button>
                </Group>
              </Box>
            </Box>
          </Modal>
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
          taskResponse.tasks.map((task, i) => {
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
