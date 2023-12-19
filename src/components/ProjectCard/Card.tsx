import { Avatar, Button, Card, Flex, Group, Modal, Text } from "@mantine/core";
import { useMediaQuery, useDisclosure } from "@mantine/hooks";

const ProjectCard = ({ project }: { project: AllProjectResponse }) => {
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
        <Button onClick={open}> View</Button>
      </Card>
      <Modal
        opened={isModalOpen}
        onClose={close}
        title="Project Name"
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Group>
          <Text>{project.name}</Text>
        </Group>
        <Group>
          <Text>Description</Text>
        </Group>
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
        <Button component="a" href={"/admin/project/" + project.id}>
          Inspect
        </Button>
      </Modal>
    </>
  );
};

export default ProjectCard;
