import { Button, Card, Flex, Group, Modal, Text } from "@mantine/core";
import { useMediaQuery, useDisclosure } from "@mantine/hooks";
import { showNotification } from "../../helpers/helpers";
import { removeProject } from "../../helpers/apiCalls";
import { Link, useNavigate } from "react-router-dom";
import { getFormattedDate, getPriority } from "../../utils/utils";
import { IconFlag3Filled } from "@tabler/icons-react";

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
        className={`${!isMobile ? "w-[25%]" : "w-full"} m-[2rem]`}
      >
        <Text>{project.name}</Text>

        <Flex>
          <Text>Description:</Text>
          <Text>
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
        <Button onClick={open}> View</Button>
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
            <Text>Description:</Text>
            <Text>
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
            <Text>
              Deadline :{getFormattedDate(new Date(project.deadline))}
            </Text>
          </Flex>
        </Flex>
        <Group>
          <Flex direction="column">
            <Text key={0}>Tasks:</Text>
            {project.childTasks.map((task, i) => {
              return (
                <>
                  <Text key={i + 1}>
                    {" "}
                    {i + 1}
                    {". "}
                    {task.name}
                  </Text>
                </>
              );
            })}
          </Flex>
        </Group>
        <Flex justify="center">
          <Button component={Link} to={"/user/project/" + project.id}>
            Inspect
          </Button>
        </Flex>
      </Modal>
    </>
  );
};

export default ProjectCard;
