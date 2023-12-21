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
import { SubTaskCard } from "../../../components";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { showNotification } from "../../../helpers/helpers";
import { addSubTask, fetchSubTasksForTask } from "../../../helpers/apiCalls";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { DatePickerInput } from "@mantine/dates";

const Home = () => {
  const { projectId, taskId } = useParams();
  const navigate = useNavigate();
  const [subtaskResponse, setSubtaskResponse] =
    useState<SubTasksOfProjectResponse>({
      projectName: "",
      projectId: "",
      taskId: "",
      taskName: "",
      subTasks: [],
    });
  const [isModalOpen, { open, close }] = useDisclosure(false);

  const addSubTaskForm = useForm<{
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
      });
      if (response.status === 200) {
        showNotification("Success", response.data.message, "success");
        // navigate('/admin/task/' + projectId + '/' + response.data.data);
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
  const arr = [...new Array(10).fill(0)];
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
                  {...addSubTaskForm.getInputProps("description")}
                />

                <DatePickerInput
                  valueFormat="DD-MM-YYYY"
                  className="w-full"
                  label="Deadline"
                  {...addSubTaskForm.getInputProps("deadline")}
                />
                <Group justify="center" mt="md">
                  <Button type="submit" onClick={submitSubTaskForm}>
                    Add subtask
                  </Button>
                </Group>
              </Box>
            </Box>
          </Modal>
          <Center className="mb-[20px]">
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
        {subtaskResponse.subTasks.map((val, i) => {
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
