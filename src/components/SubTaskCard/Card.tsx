import { Avatar, Button, Card, Flex, Group, Modal, Text } from "@mantine/core";
import { useMediaQuery, useDisclosure } from "@mantine/hooks";
import { removeSubtask } from "../../helpers/apiCalls";
import { showNotification } from "../../helpers/helpers";
import { useNavigate } from "react-router-dom";
import { getPriority } from "../../utils/utils";

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
        <Button onClick={delOpen}>Delete subtask</Button>
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
    </>
  );
};

export default SubTaskCard;
