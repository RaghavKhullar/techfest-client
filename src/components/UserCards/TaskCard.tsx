import { Button, Card, Flex, Group, Modal, Text } from "@mantine/core";
import { useMediaQuery, useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";
import { getFormattedDate, getPriority } from "../../utils/utils";
import { IconFlag3Filled } from "@tabler/icons-react";

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
          <Text fw={300} size="md">
            Priority:{" "}
          </Text>
          <IconFlag3Filled
            style={{
              color:
                task.priority === 0
                  ? "green"
                  : task.priority === 1
                    ? "yellow"
                    : task.priority === 2
                      ? "red"
                      : "gray",
            }}
          />
          {getPriority(task.priority)}
        </Flex>
        <Flex>
          <Text> Deadline :{getFormattedDate(new Date(task.deadline))}</Text>
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
            <Text fw={300} size="md">
              Priority:{" "}
            </Text>
            <IconFlag3Filled
              style={{
                color:
                  task.priority === 0
                    ? "green"
                    : task.priority === 1
                      ? "yellow"
                      : task.priority === 2
                        ? "red"
                        : "gray",
              }}
            />
            {getPriority(task.priority)}
          </Flex>
          <Flex>
            <Text> Deadline :{getFormattedDate(new Date(task.deadline))}</Text>
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
