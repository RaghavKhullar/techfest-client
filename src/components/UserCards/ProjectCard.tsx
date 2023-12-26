import { Button, Card, Flex, Group, Modal, Text } from "@mantine/core";
import { useMediaQuery, useDisclosure } from "@mantine/hooks";
import { showNotification } from "../../helpers/helpers";
import { removeProject } from "../../helpers/apiCalls";
import { Link, useNavigate } from "react-router-dom";
import { getFormattedDate, getPriority } from "../../utils/utils";
import { IconFlag3Filled, IconEye } from "@tabler/icons-react";

const ProjectCard = ({
  project,
  fetchProjects,
}: {
  project: AllProjectResponse;
  fetchProjects: () => Promise<void>;
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
        } m-[2rem] transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 drop-shadow-md m-[1rem] min-h-[15vh]`}
      >
        <Flex className="justify-between">
          <Text size="md" tt="uppercase" fw={700}>
            {project.name}
          </Text>
          <Flex className="gap-x-2">
            <Button
              component={Link}
              size="compact-sm"
              to={"/user/project/" + project.id}
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
            Description:
          </Text>
          <Text size="sm">
            {project.description.length > 0
              ? project.description
              : "No description"}
          </Text>
        </Flex>
        <Flex>
          <IconFlag3Filled
            style={{
              color:
                project.priority === 0
                  ? "green"
                  : project.priority === 1
                    ? "yellow"
                    : project.priority === 2
                      ? "red"
                      : "gray",
            }}
          />
          {getPriority(project.priority)}
        </Flex>
        <Flex>
          <Text>Deadline :{getFormattedDate(new Date(project.deadline))}</Text>
        </Flex>
      </Card>
      <Modal
        opened={isModalOpen}
        onClose={() => {
          close();
        }}
        title={project.name}
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Flex className="flex-col">
          <Flex>
            <Text fw={300} size="md">
              Description:
            </Text>
            <Text size="md">
              {project.description.length > 0
                ? project.description
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
                  project.priority === 0
                    ? "green"
                    : project.priority === 1
                      ? "yellow"
                      : project.priority === 2
                        ? "red"
                        : "gray",
              }}
            />
            {getPriority(project.priority)}
          </Flex>
          <Flex>
            <Text size="md">
              Deadline :{getFormattedDate(new Date(project.deadline))}
            </Text>
          </Flex>
        </Flex>
        <Group>
          <Flex direction="column">
            <Text fw={300} key={0}>
              Tasks:
            </Text>
            {project.childTasks.map((task, i) => {
              return (
                <>
                  <Text className="pl-5" size="sm" key={i + 1}>
                    {i + 1 + ". " + task.name}
                  </Text>
                </>
              );
            })}
          </Flex>
        </Group>
        <Flex justify="center">
          <Button component={Link} to={"/user/project/" + project.id}>
            <IconEye />
          </Button>
        </Flex>
      </Modal>
    </>
  );
};

export default ProjectCard;
