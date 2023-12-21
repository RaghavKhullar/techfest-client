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
import { ProjectCard } from "../../../components";
import { useEffect, useState } from "react";
import { addProject, fetchAllProjects } from "../../../helpers/apiCalls";
import { showNotification } from "../../../helpers/helpers";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { DatePickerInput } from "@mantine/dates";

const Home = () => {
  const [projects, setProjects] = useState<AllProjectResponse[]>([]);
  const [isModalOpen, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const addProjectForm = useForm<{
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
      name: (value) => (value.length > 0 ? null : "Invalid Project name"),
      description: (value) => (value.length > 0 ? null : "Invalid description"),
    },
  });

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
        navigate("/admin/home");
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
              {...addProjectForm.getInputProps("description")}
            />

            <DatePickerInput
              valueFormat="DD-MM-YYYY"
              className="w-full"
              label="Deadline"
              {...addProjectForm.getInputProps("deadline")}
            />
            <Group justify="center" mt="md">
              <Button type="submit" onClick={submitProjectForm}>
                Add Project
              </Button>
            </Group>
          </Box>
        </Box>
      </Modal>
      <Center className="mb-[20px]">
        <Text className="text-3xl">All projects</Text>
      </Center>
      <Center>
        <Button onClick={open}> Add a new project</Button>
      </Center>
      <Flex wrap="wrap" justify="space-around">
        {projects.map((project: AllProjectResponse, i) => {
          return (
            <ProjectCard
              key={i}
              project={project}
              fetchProjects={fetchProjects}
            />
          );
        })}
      </Flex>
    </>
  );
};

export default Home;
