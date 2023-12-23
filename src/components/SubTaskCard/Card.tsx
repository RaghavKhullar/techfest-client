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
  TextInput,
} from "@mantine/core";
import { useMediaQuery, useDisclosure } from "@mantine/hooks";
import { editSubtask, removeSubtask } from "../../helpers/apiCalls";
import { showNotification } from "../../helpers/helpers";
import { useNavigate } from "react-router-dom";
import { getPriority } from "../../utils/utils";
import {
  IconArrowBigDownLinesFilled,
  IconArrowBigUpLinesFilled,
  IconBrandMedium,
  IconCalendarDue,
  IconDiscountCheckFilled,
  IconFileTypePdf,
  IconProgress,
} from "@tabler/icons-react";
import { BACKEND_URL } from "../../../config";
import { useForm } from "@mantine/form";
import { DatePickerInput } from "@mantine/dates";
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
    name: string;
    description: string;
    deadline: Date;
    priority: string;
    document: File | undefined;
    status: string;
  }>({
    initialValues: {
      name: subTask.name,
      description: subTask.description,
      deadline: new Date(subTask.deadline),
      priority: subTask.priority.toString(),
      document:
        subTask.document.length > 0
          ? new File([], subTask.document)
          : undefined,
      status: subTask.status,
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
      const response = await editSubtask({
        name: addSubTaskForm.values.name,
        description: addSubTaskForm.values.description,
        deadline: addSubTaskForm.values.deadline,
        priority: parseInt(addSubTaskForm.values.priority),
        file: addSubTaskForm.values.document,
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
                onChange={(e) => {
                  addSubTaskForm.setFieldValue(
                    "document",
                    e != null ? e : undefined
                  );
                  if (!isNewFile) setIsNewFile(true);
                }}
              />
              {addSubTaskForm.values.document != undefined ? (
                <Button
                  className="self-end"
                  href={
                    isNewFile
                      ? URL.createObjectURL(addSubTaskForm.values.document)
                      : `${BACKEND_URL}/documents/files/${subTask.document}`
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
  taskName,
  projectId,
  projectName,
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
  const [isDeleteModelOpen, { open: delOpen, close: delClose }] =
    useDisclosure(false);
  const [isEditModalOpen, { open: editOpen, close: editClose }] =
    useDisclosure(false);
  const navigate = useNavigate();
  const deleteSubtask = async () => {
    try {
      const response = await removeSubtask({
        taskId: taskId,
        subTaskId: subTask.id,
      });
      if (response.status === 200) {
        showNotification("Success", response.data.message, "success");
        close();
        delClose();
        fetchSubTasksOfProject(projectId, taskId);
        return;
      } else {
        showNotification("Error", response.data.message, "error");
        close();
        delClose();
        return;
      }
    } catch {
      close();
      delClose();
      navigate("/admin/home");
      return;
    }
  };
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
          if (isDeleteModelOpen) {
            delClose();
          }
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
        <Flex className="mt-[10px] justify-between">
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
        <Flex className="mt-[10px] justify-between">
          <Button onClick={delOpen}>Delete subtask</Button>
          <Button onClick={editOpen}>Edit subtask</Button>
        </Flex>
      </Modal>

      <Modal
        opened={isDeleteModelOpen}
        onClose={() => {}}
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        withCloseButton={false}
      >
        <Text className="text-3xl">Warning! {subTask.name}</Text>
        <Text className="text-lg">
          Are you sure you want to delete this task? It will remove all the
          sub-task details
        </Text>
        <Flex className="mt-[20px] justify-evenly">
          <Button onClick={deleteSubtask}> Yes</Button>
          <Button onClick={delClose}> No</Button>
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
