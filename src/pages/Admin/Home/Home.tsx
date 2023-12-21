import { Box, Button, Group, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { showNotification } from "../../../helpers/helpers";
import { useNavigate } from "react-router-dom";
import { addProject } from "../../../helpers/apiCalls";

const Home = () => {
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

  return (
    <>
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
    </>
  );
};

export default Home;
