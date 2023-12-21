import { Avatar, Button, Card, Flex, Group, Modal, Text } from "@mantine/core";
import { useMediaQuery, useDisclosure } from "@mantine/hooks";
import { showNotification } from "../../helpers/helpers";
import { removeTask } from "../../helpers/apiCalls";
import { useNavigate } from "react-router-dom";

const TaskCard = ({
  task,
  projectId,
  projectName,
  fetchTasksOfProject,
}: {
  task: AllProjectResponse;
  projectId: string;
  projectName: string;
  fetchTasksOfProject: (id: string) => Promise<void>;
}) => {
  const isMobile = useMediaQuery("max-width:600px");
  const [isModalOpen, { open, close }] = useDisclosure(false);
  const [isDeleteModelOpen, { open: delOpen, close: delClose }] =
    useDisclosure(false);
  const navigate = useNavigate();
  const deleteTask = async () => {
    try {
      const response = await removeTask({
        projectId: projectId,
        taskId: task.id,
      });
      if (response.status === 200) {
        showNotification("Success", response.data.message, "success");
        close();
        delClose();
        fetchTasksOfProject(projectId);
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
      navigate("/admin/viewProject");
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
        <Text>{task.name}</Text>

        <Flex>
          <Text>Description: </Text>
          <Text>
            {task.description.length > 0 ? task.description : "No description"}
          </Text>
        </Flex>
        <Button onClick={open}> View</Button>
      </Card>
      <Modal
        opened={isModalOpen}
        onClose={() => {
          close();
          if (isDeleteModelOpen) {
            delClose();
          }
        }}
        title={task.name}
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Group>
          <Text>Description</Text>
        </Group>
        <Group>
          <Flex direction="column">
            <Text>Subtasks</Text>
            {task.childTasks.map((subTask, i) => {
              return (
                <>
                  <Text key={i}>
                    {i + 1}
                    {". "} {subTask.name}
                  </Text>
                </>
              );
            })}
          </Flex>
        </Group>
        {/* Navigate to project page on click */}
        <Flex justify="space-between">
          <Button onClick={delOpen}>Delete task</Button>
          <Button
            component="a"
            href={"/admin/task/" + projectId + "/" + task.id}
          >
            Inspect
          </Button>
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
        <Text className="text-3xl">Warning! {task.name}</Text>
        <Text className="text-lg">
          Are you sure you want to delete this task? It will remove all the
          sub-tasks
        </Text>
        <Flex className="mt-[20px] justify-evenly">
          <Button onClick={deleteTask}> Yes</Button>
          <Button onClick={delClose}> No</Button>
        </Flex>
      </Modal>
    </>
  );
};

export default TaskCard;
