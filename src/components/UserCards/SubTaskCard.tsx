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
import { getPriority } from "../../utils/utils";
import {
  IconCalendarDue,
  IconDiscountCheckFilled,
  IconFileTypePdf,
  IconProgress,
} from "@tabler/icons-react";
import { BACKEND_URL } from "../../../config";
import { useForm } from "@mantine/form";
import { useState } from "react";

const EditSubTaskModel = ({
  isEditModalOpen,
  editClose,
  subTask,
  projectId,
  taskId,
  fetchSubTasksOfProject,
}: {
  isEditModalOpen: boolean;
  editClose: () => void;
  subTask: SubTaskResponse;
  projectId: string;
  taskId: string;
  fetchSubTasksOfProject: (projectId: string, taskId: string) => Promise<void>;
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
        fetchSubTasksOfProject(projectId as string, taskId as string);
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
                {...addSubTaskForm.getInputProps("document")}
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
  subTask,
  taskId,
  projectId,
  fetchSubTasksOfProject,
}: {
  subTask: SubTaskResponse;
  taskId: string;
  taskName: string;
  projectId: string;
  projectName: string;
  fetchSubTasksOfProject: (projectId: string, taskId: string) => Promise<void>;
}) => {
  const isMobile = useMediaQuery("max-width:600px");
  const [isModalOpen, { open, close }] = useDisclosure(false);
  const [isEditModalOpen, { open: editOpen, close: editClose }] =
    useDisclosure(false);
  return (
    <>
      <Card
        shadow="xl"
        padding="md"
        className={`${!isMobile ? "w-[25%]" : "w-full"} m-[2rem]`}
      >
        <Flex justify="space-between">
          {/* No user */}
          <Avatar />
          <Button onClick={open}> View</Button>
        </Flex>

        <Text>{subTask.name}</Text>

        <Flex>
          <Text>Description: </Text>
          <Text>
            {subTask.description.length > 0
              ? subTask.description
              : "No description"}
          </Text>
        </Flex>
        <Flex>
          <Text>Priority: </Text>
          <Text>{getPriority(subTask.priority)}</Text>
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
        title={subTask.name}
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Group>
          <Text>Alloted to: </Text>
          {subTask.allotedUsers && (
            <>
              <Flex justify="space-between" align="center">
                <Avatar src={subTask.allotedUsers.image} />
                <Text> {subTask.allotedUsers.name}</Text>
              </Flex>
            </>
          )}
        </Group>
        <Flex className="flex-col">
          <Flex>
            <Text>Description: </Text>
            <Text>
              {subTask.description.length > 0
                ? subTask.description
                : "No description"}
            </Text>
          </Flex>
          <Flex>
            <Text>Priority: </Text>
            <Text>{getPriority(subTask.priority)}</Text>
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
          <Button onClick={editOpen}>Edit subtask</Button>
        </Flex>
      </Modal>
      <EditSubTaskModel
        isEditModalOpen={isEditModalOpen}
        editClose={editClose}
        fetchSubTasksOfProject={fetchSubTasksOfProject}
        subTask={subTask}
        projectId={projectId}
        taskId={taskId}
      />
    </>
  );
};

export default SubTaskCard;
