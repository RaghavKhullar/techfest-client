import {
  Box,
  Button,
  Center,
  Flex,
  Group,
  SegmentedControl,
  TextInput,
  Text,
  NumberInput,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import {
  IconArrowBigDownLinesFilled,
  IconArrowBigUpLinesFilled,
  IconBrandMedium,
  IconGenderFemale,
  IconGenderMale,
} from "@tabler/icons-react";
import { position, role } from "../../../utils/utils";
import { showNotification } from "../../../helpers/helpers";
import { addUser } from "../../../helpers/apiCalls";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const navigate = useNavigate();

  const submitAddUserForm = async () => {
    if (addUserForm.validate().hasErrors) {
      showNotification("Error", "Some fields are incorrect", "error");
      return;
    }
    try {
      const response = await addUser({
        name: addUserForm.values.name,
        email: addUserForm.values.email,
        gender: addUserForm.values.gender,
        role: addUserForm.values.role,
        salary: addUserForm.values.salary,
        position: addUserForm.values.position,
        joiningDate: addUserForm.values.joiningDate,
      });
      if (response.status === 200) {
        showNotification("Success", response.data.message, "success");
        addUserForm.reset();
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

  const addUserForm = useForm<{
    name: string;
    email: string;
    gender: string;
    role: string;
    salary: number;
    position: string;
    joiningDate: Date;
  }>({
    initialValues: {
      name: "",
      email: "",
      gender: "Male",
      joiningDate: new Date(),
      salary: 0,
      role: "HR",
      position: "Intern",
    },

    validate: {
      name: (value) => (value.length > 0 ? null : "Invalid name"),
      email: (value) =>
        /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value) ? null : "Invalid email",
      gender: (value) => (value.length > 0 ? null : "Invalid gender"),
      salary: (value) => (value > 0 ? null : "Invalid salary"),
      role: (value) => (value.length > 0 ? null : "Invalid role"),
      position: (value) => (value.length > 0 ? null : "Invalid position"),
    },
  });
  return (
    <>
      <Center>
        <Text className="text-3xl">Add a new user</Text>
      </Center>
      <Box w={"30%"} mx="auto" mt="xl">
        <Box mx="auto">
          <TextInput
            withAsterisk
            label="Add name of the user"
            placeholder="John Doe"
            {...addUserForm.getInputProps("name")}
          />
          <TextInput
            withAsterisk
            label="Add email of the user"
            placeholder="yours@gmail.com"
            {...addUserForm.getInputProps("email")}
          />
          <Flex className="w-full flex-col mt-[10px]">
            <Text className="text-sm">Gender</Text>
            <SegmentedControl
              data={[
                {
                  value: "Male",
                  label: (
                    <Center style={{ gap: 10 }}>
                      <IconGenderMale />
                      <span>Male</span>
                    </Center>
                  ),
                },
                {
                  value: "Female",
                  label: (
                    <Center style={{ gap: 10 }}>
                      <IconGenderFemale />
                      <span>Female</span>
                    </Center>
                  ),
                },
              ]}
              transitionDuration={200}
              transitionTimingFunction="linear"
              {...addUserForm.getInputProps("gender")}
            />
          </Flex>

          <DatePickerInput
            valueFormat="DD-MM-YYYY"
            className="w-full mt-[10px]"
            label="Joining date"
            {...addUserForm.getInputProps("joiningDate")}
          />
          <NumberInput
            label="Salary"
            withAsterisk
            placeholder="Enter the salary"
            {...addUserForm.getInputProps("salary")}
          />

          <Flex className="w-full flex-col mt-[10px]">
            <Text className="text-sm">Role</Text>
            <SegmentedControl
              data={role}
              transitionDuration={200}
              transitionTimingFunction="linear"
              {...addUserForm.getInputProps("role")}
            />
          </Flex>
          <Flex className="w-full flex-col mt-[10px]">
            <Text className="text-sm">Position</Text>
            <SegmentedControl
              data={position}
              transitionDuration={200}
              transitionTimingFunction="linear"
              {...addUserForm.getInputProps("position")}
            />
          </Flex>
          <Group justify="center" mt="md">
            <Button type="submit" onClick={submitAddUserForm}>
              Add user
            </Button>
          </Group>
        </Box>
      </Box>
    </>
  );
};

export default AddUser;
