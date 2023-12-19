import { Avatar, Button, Card, Flex, Group, Modal, Text } from "@mantine/core";
import { useMediaQuery, useDisclosure } from "@mantine/hooks";

const TaskCard = ({
  task,
  projectId,
  projectName,
}: {
  task: AllProjectResponse;
  projectId: string;
  projectName: string;
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
        onClose={close}
        title="Task Name"
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Group>
          <Text>{task.name}</Text>
        </Group>
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
        <Button component="a" href={"/admin/task/" + projectId + "/" + task.id}>
          Inspect
        </Button>
      </Modal>
    </>
  );
};

export default TaskCard;
