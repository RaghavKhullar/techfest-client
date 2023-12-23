import {
  Button,
  Card,
  Flex,
  Text,
  Image,
  Modal,
  Center,
  Box,
  TextInput,
  SegmentedControl,
  NumberInput,
  Group,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { BACKEND_URL } from "../../../config";
import { DatePickerInput } from "@mantine/dates";
import { position, role } from "../../utils/utils";
import { IconGenderFemale, IconGenderMale } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { editUserByAdmin } from "../../helpers/apiCalls";
import { showNotification } from "../../helpers/helpers";
import { useNavigate } from "react-router-dom";

const EditUserModel = ({
  user,
  isEditModalOpen,
  editClose,
  fetchUsers,
}: {
  user: UserResponseAdmin;
  isEditModalOpen: boolean;
  editClose: () => void;
  fetchUsers: () => Promise<void>;
}) => {
  const navigate = useNavigate();
  const editUserForm = useForm<{
    gender: string;
    role: string;
    salary: number;
    position: string;
    joiningDate: Date;
    absences: number;
    moral: string;
    currentRating: number;
  }>({
    initialValues: {
      gender: user.gender,
      joiningDate: new Date(user.joiningDate),
      salary: user.salary,
      role: user.role,
      position: user.position,
      absences: user.absences || 0,
      moral: user.moral || "",
      currentRating: user.currentRating || 0,
    },

    validate: {
      gender: (value) => (value.length > 0 ? null : "Invalid gender"),
      salary: (value) => (value > 0 ? null : "Invalid salary"),
      role: (value) => (value.length > 0 ? null : "Invalid role"),
      position: (value) => (value.length > 0 ? null : "Invalid position"),
      absences: (value) => (value >= 0 ? null : "Invalid absences"),
      currentRating: (value) =>
        value >= 0 && value <= 10
          ? null
          : "Rating should be between 0 and 10 (both inclusive)",
      moral: (value) => (value.length > 0 ? null : "Moral can't be empty"),
    },
  });

  const submiteditUserForm = async () => {
    if (editUserForm.validate().hasErrors) {
      showNotification("Error", "Invalid paramters", "error");
      return;
    }
    try {
      const response = await editUserByAdmin({
        gender: editUserForm.values.gender,
        joiningDate: editUserForm.values.joiningDate,
        salary: editUserForm.values.salary,
        role: editUserForm.values.role,
        position: editUserForm.values.position,
        absences: editUserForm.values.absences,
        moral: editUserForm.values.moral,
        currentRating: editUserForm.values.currentRating,
        userId: user.id,
      });
      if (response.status === 200) {
        showNotification("Success", response.data.message, "success");
        fetchUsers();
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
        onClose={() => {
          editClose();
        }}
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Flex className="flex-col">
          <Text className="text-3xl text-center">Edit user form</Text>
          <Text className="text-xl text-center">Name: {user.name}</Text>
          <Text className="text-xl text-center">Email: {user.email}</Text>
        </Flex>
        <Box className="w-full" mx="auto" mt="xl">
          <Box mx="auto">
            <NumberInput
              label="Absences"
              withAsterisk
              placeholder="Enter the absent days"
              {...editUserForm.getInputProps("absences")}
            />
            <NumberInput
              label="Rating"
              withAsterisk
              placeholder="Enter the rating"
              {...editUserForm.getInputProps("currentRating")}
            />
            <TextInput
              label="Moral"
              withAsterisk
              placeholder="Enter the Moral"
              {...editUserForm.getInputProps("moral")}
            />
            <Flex className="w-full flex-col mt-[10px]">
              <Text className="text-sm">Role</Text>
              <SegmentedControl
                data={role}
                transitionDuration={200}
                transitionTimingFunction="linear"
                {...editUserForm.getInputProps("role")}
              />
            </Flex>
            <Flex className="w-full flex-col mt-[10px]">
              <Text className="text-sm">Position</Text>
              <SegmentedControl
                data={position}
                transitionDuration={200}
                transitionTimingFunction="linear"
                {...editUserForm.getInputProps("position")}
              />
            </Flex>
            <DatePickerInput
              valueFormat="DD-MM-YYYY"
              className="w-full mt-[10px]"
              label="Joining date"
              {...editUserForm.getInputProps("joiningDate")}
            />
            <NumberInput
              label="Salary"
              withAsterisk
              placeholder="Enter the salary"
              {...editUserForm.getInputProps("salary")}
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
                {...editUserForm.getInputProps("gender")}
              />
            </Flex>
            <Flex justify="space-between" mt="md">
              <Button type="submit" onClick={editUserForm.reset}>
                Reset form
              </Button>
              <Button type="submit" onClick={submiteditUserForm}>
                Edit user
              </Button>
            </Flex>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

const UserViewModal = ({
  user,
  isModalOpen,
  close,
  fetchUsers,
}: {
  user: UserResponseAdmin;
  isModalOpen: boolean;
  close: () => void;
  fetchUsers: () => Promise<void>;
}) => {
  const [isEditModalOpen, { open: editOpen, close: editClose }] =
    useDisclosure(false);
  const getFormattedDate = (date: Date) => {
    const yyyy = date.getFullYear();
    let mm: any = date.getMonth() + 1; // Months start at 0!
    let dd: any = date.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    return dd + "/" + mm + "/" + yyyy;
  };
  return (
    <>
      <Modal
        opened={isModalOpen}
        onClose={() => {
          close();
          if (isEditModalOpen) {
            editClose();
          }
        }}
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Flex className="justify-center align-center">
          <Image
            className="max-w-[50%]"
            src={`${BACKEND_URL}/images/profiles/${
              user.image.length > 0 ? user.image : "dummyProfile.png"
            }`}
          />
        </Flex>
        <Text ta="center" fw={500} size="lg" mt="md">
          {user.name}
        </Text>
        <Text size="md">Email: {user.email}</Text>
        <Text size="md">Role: {user.role}</Text>
        <Text size="md">Position: {user.position}</Text>
        <Text size="md">Gender: {user.gender}</Text>
        <Text size="md">Age: {user.age}</Text>
        <Text size="md">
          Marital Status: {user.isMarried ? "Married" : "Unmarried"}
        </Text>
        <Text size="md">Salary: {user.salary}</Text>
        <Text size="md">Absence: {user.absences}</Text>
        <Text size="md">
          Joining Date: {getFormattedDate(new Date(user.joiningDate))}
        </Text>
        <Text size="md">Current Rating: {user.currentRating}</Text>
        <Text size="md">
          Moral: {user.moral.length > 0 ? user.moral : "Not specified"}
        </Text>
        <Text size="md">Stress score: {user.stressBurnoutScore}</Text>
        <Button onClick={editOpen}>Edit profile</Button>
      </Modal>
      <EditUserModel
        isEditModalOpen={isEditModalOpen}
        editClose={editClose}
        user={user}
        fetchUsers={fetchUsers}
      />
    </>
  );
};

const UserCard = ({
  user,
  fetchUsers,
}: {
  user: UserResponseAdmin;
  fetchUsers: () => Promise<void>;
}) => {
  const isMobile = useMediaQuery("max-width:600px");
  const [isModalOpen, { open, close }] = useDisclosure(false);
  return (
    <>
      <Card
        shadow="xl"
        padding="md"
        className={`${!isMobile ? "w-[25%]" : "w-full"} m-[2rem]`}
      >
        <Flex className="justify-center align-center">
          <Image
            className="max-w-[50%]"
            src={`${BACKEND_URL}/images/profiles/${
              user.image.length > 0 ? user.image : "dummyProfile.png"
            }`}
          />
        </Flex>

        <Text ta="center" fw={500} size="lg" mt="md">
          {user.name}
        </Text>
        <Text size="md">Email: {user.email}</Text>
        <Text size="md">Role: {user.role}</Text>
        <Text size="md">Position: {user.position}</Text>
        <Button className="mt-[10px]" onClick={open}>
          View full details
        </Button>
      </Card>
      <UserViewModal
        isModalOpen={isModalOpen}
        close={close}
        user={user}
        fetchUsers={fetchUsers}
      />
    </>
  );
};

export default UserCard;
