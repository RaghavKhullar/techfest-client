import { Button, Card, Flex, Group, Modal, Text } from "@mantine/core";
import { useMediaQuery, useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";
import { getFormattedDate, getPriority } from "../../utils/utils";
import { IconFlag3Filled, IconEye } from "@tabler/icons-react";

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
        className={`${
          !isMobile ? "w-[25%]" : "w-full"
        } m-[2rem] transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 m-[2rem] drop-shadow-md min-h-[15vh]`}
      >
        <Flex className="justify-between">
          <Text size="md" tt="uppercase" fw={700}>
            {task.name}
          </Text>
          <Flex className="gap-x-2">
            <Button
              size="compact-sm"
              component={Link}
              to={"/user/task/" + projectId + "/" + task.id}
            >
              <IconEye />
            </Button>
            <Button onClick={open} variant="filled" size="compact-sm">
              View
            </Button>
          </Flex>
        </Flex>

        <Flex>
          <Text fw={300} size="sm">
            Description:{" "}
          </Text>
          <Text size="sm">
            {task.description.length > 0 ? task.description : "No description"}
          </Text>
        </Flex>
        <Flex>
          <Text size="md">Priority: </Text>
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
            <Text fw={300} size="md">
              Subtasks
            </Text>
            {task.childTasks.map((subTask, i) => {
              return (
                <>
                  <Text className="pl-5" size="sm" key={i}>
                    {i + 1 + ". " + subTask.name}
                  </Text>
                </>
              );
            })}
          </Flex>
        </Group>
        {/* Navigate to project page on click */}
        <Flex className="w-1/1 gap-x-4 justify-self-center" justify="center">
          <Button
            component={Link}
            to={"/user/task/" + projectId + "/" + task.id}
          >
            <IconEye />
          </Button>
        </Flex>
      </Modal>
    </>
  );
};

export default TaskCard;
