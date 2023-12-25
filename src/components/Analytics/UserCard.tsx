import {
  Card,
  Flex,
  Text,
  Image,
  Center,
  Modal,
  Box,
  FileInput,
  Button,
  SegmentedControl,
  Group,
  NumberInput,
} from "@mantine/core";
import { BACKEND_URL } from "../../../config";
import { IconEdit, IconPhotoScan } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "../../helpers/helpers";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { updateUserProfile } from "../../helpers/apiCalls";

const EditSubTaskModel = ({
  isEditModalOpen,
  editClose,
  user,
  getUserAnalytics,
}: {
  isEditModalOpen: boolean;
  editClose: () => void;
  user: UserAnalytics;
  getUserAnalytics: () => Promise<void>;
}) => {
  const navigate = useNavigate();
  const [isNewFile, setIsNewFile] = useState<boolean>(false);
  const editUserProfile = useForm<{
    image: File | undefined;
    isMarried: string;
    age: number;
  }>({
    initialValues: {
      image: user.image.length > 0 ? new File([], user.image) : undefined,
      isMarried: user.isMarried.toString(),
      age: user.age,
    },
    validate: {
      age: (val) => (val > 0 ? null : "Age should be valid"),
    },
  });

  const submitEditUserProfileForm = async () => {
    if (editUserProfile.validate().hasErrors) {
      showNotification("Error", "Invalid fields", "error");
      return;
    }
    try {
      const response = await updateUserProfile({
        file: editUserProfile.values.image,
        isMarried: editUserProfile.values.isMarried == "true",
        age: editUserProfile.values.age,
        isFileUpdated: isNewFile,
      });
      if (response.status === 200) {
        showNotification("Success", response.data.message, "success");
        getUserAnalytics();
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
          setIsNewFile(false);
          editClose();
        }}
        title="Update Profile"
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Box w={"80%"} mx="auto">
          <Box mx="auto">
            <Flex className="mt-[10px] justify-between">
              <FileInput
                className={
                  editUserProfile.values.image != undefined
                    ? "w-[70%]"
                    : "w-[100%]"
                }
                label="Upload the user image"
                leftSection={<IconPhotoScan />}
                accept="file"
                {...editUserProfile.getInputProps("image")}
                clearable
                onChange={(e) => {
                  editUserProfile.setFieldValue(
                    "image",
                    e != null ? e : undefined
                  );
                  if (!isNewFile) setIsNewFile(true);
                }}
              />
              {editUserProfile.values.image != undefined ? (
                <Button
                  className="self-end"
                  href={
                    isNewFile
                      ? URL.createObjectURL(editUserProfile.values.image)
                      : `${BACKEND_URL}/documents/files/${user.image}`
                  }
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
              <Text className="text-sm">Marital Status</Text>
              <SegmentedControl
                data={[
                  {
                    value: "true",
                    label: (
                      <Center style={{ gap: 10 }}>
                        <span>Married</span>
                      </Center>
                    ),
                  },
                  {
                    value: "false",
                    label: (
                      <Center style={{ gap: 10 }}>
                        <span>Unmarried</span>
                      </Center>
                    ),
                  },
                ]}
                transitionDuration={200}
                transitionTimingFunction="linear"
                {...editUserProfile.getInputProps("isMarried")}
              />
            </Flex>
            <Flex className="w-full flex-col mt-[10px]">
              <NumberInput
                label="Age"
                withAsterisk
                placeholder="Enter the age"
                {...editUserProfile.getInputProps("age")}
              />
            </Flex>
            <Group justify="space-evenly" mt="md">
              <Button
                type="submit"
                onClick={() => {
                  editUserProfile.reset();
                  setIsNewFile(false);
                }}
              >
                Reset form
              </Button>
              <Button type="submit" onClick={submitEditUserProfileForm}>
                Update Profile
              </Button>
            </Group>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

const UserCard = ({
  user,
  getUserAnalytics,
}: {
  user: UserAnalytics;
  getUserAnalytics: () => Promise<void>;
}) => {
  const getFormattedDate = (date: Date) => {
    const yyyy = date.getFullYear();
    let mm: any = date.getMonth() + 1; // Months start at 0!
    let dd: any = date.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    return dd + "/" + mm + "/" + yyyy;
  };

  const [isEditModalOpen, { open: editOpen, close: editClose }] =
    useDisclosure(false);
  return (
    <>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        className="w-[45%] justify-center"
      >
        <Flex className="w-full flex-col">
          <Center className="mb-[6%]">
            <Text
              ta="center"
              className="text-3xl cursor-pointer"
              onClick={editOpen}
            >
              User Details
            </Text>
            <IconEdit className="cursor-pointer" onClick={editOpen} />
          </Center>
          <Flex className="w-[100%] max-h-[64%] justify-between">
            <Flex className="w-[30%] justify-center items-center max-h-[100%]">
              <Image
                src={`${BACKEND_URL}/images/profiles/${
                  user.image.length > 0 ? user.image : "dummyProfile.png"
                }`}
                className="max-h-[100%]"
              />
            </Flex>

            <Flex className="w-[65%] justify-between">
              <Flex className="flex-col w-full max-w-[45%] justify-between">
                <Text className="text-md truncate">Name: {user.name}</Text>
                <Text className="text-md truncate">Email: {user.email}</Text>
                <Text className="text-md truncate">Role: {user.role}</Text>
                <Text className="text-md truncate">
                  Position: {user.position}
                </Text>
              </Flex>
              <Flex className="flex-col flex-wrap w-full max-w-[45%] justify-between">
                <Text className="text-md truncate">Salary: {user.salary}</Text>
                <Text className="text-md truncate">Age: {user.age}</Text>
                <Text className="text-md truncate">
                  Marrital: {user.isMarried ? "Married" : "Unmarried"}
                </Text>
                <Text className="text-md truncate">Gender: {user.gender}</Text>
                <Text className="text-md truncate">
                  Joining date: {getFormattedDate(new Date(user.joiningDate))}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Card>
      {user.id.length > 0 && (
        <EditSubTaskModel
          isEditModalOpen={isEditModalOpen}
          editClose={editClose}
          user={user}
          getUserAnalytics={getUserAnalytics}
        />
      )}
    </>
  );
};

export default UserCard;
