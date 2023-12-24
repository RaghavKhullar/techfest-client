import { Button, Card, Flex, Group, Modal, Text } from "@mantine/core";
import { useMediaQuery, useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";
import { getPriority } from "../../utils/utils";

const TaskCard = ({
  task,
  projectId,
}: {
  task: AllProjectResponse;
  projectId: string;
  projectName: string;
  fetchTasksOfProject: (id: string) => Promise<void>;
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
        <Flex>
          <Text>Priority: </Text>
          <Text>{getPriority(task.priority)}</Text>
        </Flex>
        <Button onClick={open}> View</Button>
      </Card>
      <Modal
        opened={isModalOpen}
        onClose={() => {
          close();
        }}
        title={task.name}
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Flex className="flex-col">
          <Flex>
            <Text>Description: </Text>
            <Text>
              {task.description.length > 0
                ? task.description
                : "No description"}
            </Text>
          </Flex>
          <Flex>
            <Text>Priority: </Text>
            <Text>{getPriority(task.priority)}</Text>
          </Flex>
        </Flex>
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
        <Flex justify="space-center">
          <Button
            component={Link}
            to={"/user/task/" + projectId + "/" + task.id}
          >
            Inspect
          </Button>
        </Flex>
      </Modal>
    </>
  );
};

export default TaskCard;
