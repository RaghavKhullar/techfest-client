import {
  Avatar,
  Box,
  Button,
  Card,
  Center,
  FileInput,
  Flex,
  Group,
  Modal,
  SegmentedControl,
  Text,
} from "@mantine/core";
import { useMediaQuery, useDisclosure } from "@mantine/hooks";
import { editSubtaskUser } from "../../helpers/apiCalls";
import { showNotification } from "../../helpers/helpers";
import { useNavigate } from "react-router-dom";
import { getFormattedDate, getPriority } from "../../utils/utils";
import {
  IconCalendarDue,
  IconDiscountCheckFilled,
  IconFileTypePdf,
  IconProgress,
  IconLink,
  IconFlag3Filled,
  IconEdit,
} from "@tabler/icons-react";
import { BACKEND_URL } from "../../../config";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import useAuthUser from "../../context/userContext";

const EditSubTaskModel = ({
  isEditModalOpen,
  editClose,
  subTask,
  fetchAllotedSubTask,
}: {
  isEditModalOpen: boolean;
  editClose: () => void;
  subTask: AllocatedSubTaskResponse;
  fetchAllotedSubTask: () => Promise<void>;
}) => {
  const navigate = useNavigate();
  const [isNewFile, setIsNewFile] = useState<boolean>(false);
  const addSubTaskForm = useForm<{
    userDocument: File | undefined;
    status: string;
  }>({
    initialValues: {
      userDocument:
        subTask.userDocument.length > 0
          ? new File([], subTask.userDocument)
          : undefined,
      status: subTask.status,
    },
  });

  const submitSubTaskForm = async () => {
    try {
      const response = await editSubtaskUser({
        file: addSubTaskForm.values.userDocument,
        status: addSubTaskForm.values.status,
        subtaskId: subTask.id,
        isFileUpdated: isNewFile,
      });
      if (response.status === 200) {
        showNotification("Success", response.data.message, "success");
        fetchAllotedSubTask();
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
        title="Edit subtask"
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
                  addSubTaskForm.values.userDocument != undefined
                    ? "w-[70%]"
                    : "w-[100%]"
                }
                label="Upload the user pdf file"
                leftSection={<IconFileTypePdf />}
                accept="application/pdf"
                {...addSubTaskForm.getInputProps("userDocument")}
                clearable
                onChange={(e) => {
                  addSubTaskForm.setFieldValue(
                    "userDocument",
                    e != null ? e : undefined
                  );
                  if (!isNewFile) setIsNewFile(true);
                }}
              />
              {addSubTaskForm.values.userDocument != undefined ? (
                <Button
                  className="self-end"
                  href={
                    isNewFile
                      ? URL.createObjectURL(addSubTaskForm.values.userDocument)
                      : `${BACKEND_URL}/documents/files/${subTask.userDocument}`
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
                {...addSubTaskForm.getInputProps("status")}
              />
            </Flex>
            <Group justify="space-evenly" mt="md">
              <Button
                type="submit"
                onClick={() => {
                  addSubTaskForm.reset();
                  setIsNewFile(false);
                }}
              >
                Reset form
              </Button>
              <Button type="submit" onClick={submitSubTaskForm}>
                Edit subtask
              </Button>
            </Group>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

const SubTaskCard = ({
  user,
  subTask,
  fetchAllotedSubTask,
}: {
  user: UserSubTask;
  subTask: AllocatedSubTaskResponse;
  fetchAllotedSubTask: () => Promise<void>;
}) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("max-width:600px");
  const [isModalOpen, { open, close }] = useDisclosure(false);
  const [isEditModalOpen, { open: editOpen, close: editClose }] =
    useDisclosure(false);
  return (
    <>
      <Card
        shadow="xl"
        padding="md"
        className={`${
          !isMobile ? "w-[25%]" : "w-full"
        } m-[2rem] transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 m-[2rem] drop-shadow-md min-h-[15vh]`}
      >
        <Flex justify="space-between">
          {/* No user */}
          <Avatar
            src={`${BACKEND_URL}/images/profiles/${
              user.image.length > 0 ? user.image : "dummyProfile.png"
            }`}
            size={30}
            mr={"20px"}
          />
          <Button onClick={open}> View</Button>
        </Flex>

        <Text size="md" tt="uppercase" fw={700}>
          {subTask.name}
        </Text>

        <Flex>
          <Text size="sm">
            {subTask.description.length > 0
              ? subTask.description
              : "No description"}
          </Text>
        </Flex>
        <Flex>
          <IconFlag3Filled
            style={{
              color:
                subTask.priority === 0
                  ? "green"
                  : subTask.priority === 1
                    ? "yellow"
                    : subTask.priority === 2
                      ? "red"
                      : "gray",
            }}
          />
          {getPriority(subTask.priority)}
        </Flex>
        <Flex>
          <Text>Deadline :{getFormattedDate(new Date(subTask.deadline))}</Text>
        </Flex>
        <Flex>
          <Text>
            Predicted Completion date :
            {getFormattedDate(new Date(subTask.predictedDeadline))}
          </Text>
        </Flex>
      </Card>
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
        <Center className="mb-[10px]">
          <IconLink />{" "}
          <Text
            component="a"
            href={"/user/project/" + subTask.projectId}
            className="text-2xl"
            ta="center"
          >
            Project: {subTask.projectName}
          </Text>
        </Center>
        <Center className="mb-[6px]">
          <IconLink />
          <Text
            component="a"
            href={"/user/task/" + subTask.projectId + "/" + subTask.taskId}
            className="text-lg"
            ta="center"
          >
            Task: {subTask.taskName}
          </Text>
        </Center>
        <Center className="mb-[6px]">
          <Text ta="center">Subtask: {subTask.name}</Text>
        </Center>

        <Group>
          <Text>Alloted to: </Text>
          {user && (
            <>
              <Flex align="center">
                <Avatar
                  src={`${BACKEND_URL}/images/profiles/${
                    user.image.length > 0 ? user.image : "dummyProfile.png"
                  }`}
                  size={30}
                  mr={"20px"}
                />
                <Text> {user.name}</Text>
              </Flex>
            </>
          )}
        </Group>
        <Flex className="flex-col">
          <Flex>
            <Text fw={300} size="md">
              Priority:{" "}
            </Text>
            <IconFlag3Filled
              style={{
                color:
                  subTask.priority === 0
                    ? "green"
                    : subTask.priority === 1
                      ? "yellow"
                      : subTask.priority === 2
                        ? "red"
                        : "gray",
              }}
            />
            {getPriority(subTask.priority)}
          </Flex>
          <Flex>
            <Text>
              Deadline :{getFormattedDate(new Date(subTask.deadline))}
            </Text>
          </Flex>
          <Flex>
            <Text>
              Predicted Completion date :
              {getFormattedDate(new Date(subTask.predictedDeadline))}
            </Text>
          </Flex>
        </Flex>
        <Flex className="mt-[10px] justify-evenly">
          {subTask.document && subTask.document.length > 0 && (
            <>
              <Button
                leftSection={<IconFileTypePdf />}
                component="a"
                href={`${BACKEND_URL}/documents/files/${subTask.document}`}
                target="_blank"
              >
                {" "}
                View attachment
              </Button>
            </>
          )}
          {subTask.userDocument && subTask.userDocument.length > 0 && (
            <>
              <Button
                leftSection={<IconFileTypePdf />}
                component="a"
                href={`${BACKEND_URL}/documents/files/${subTask.userDocument}`}
                target="_blank"
              >
                {" "}
                View user doc
              </Button>
            </>
          )}
        </Flex>

        <Flex className="mt-[10px] justify-center">
          <Button onClick={editOpen}>
            <IconEdit />
          </Button>
        </Flex>
      </Modal>
      <EditSubTaskModel
        isEditModalOpen={isEditModalOpen}
        editClose={editClose}
        fetchAllotedSubTask={fetchAllotedSubTask}
        subTask={subTask}
      />
    </>
  );
};

export default SubTaskCard;
