import { Avatar, Button, Card, Flex, Group, Modal, Text } from "@mantine/core";
import { useMediaQuery, useDisclosure } from "@mantine/hooks";
import { showNotification } from "../../helpers/helpers";
import { removeProject } from "../../helpers/apiCalls";
import { useNavigate } from "react-router-dom";
import { getPriority } from "../../utils/utils";
const ProjectCard = ({
  project,
  fetchProjects,
}: {
  project: AllProjectResponse;
  fetchProjects: () => Promise<void>;
}) => {
  const isMobile = useMediaQuery("max-width:600px");
  const [isModalOpen, { open, close }] = useDisclosure(false);
  const [isDeleteModelOpen, { open: delOpen, close: delClose }] =
    useDisclosure(false);
  const navigate = useNavigate();
  const deleteProject = async () => {
    try {
      const response = await removeProject(project.id);
      if (response.status === 200) {
        showNotification("Success", response.data.message, "success");
        close();
        delClose();
        fetchProjects();
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
          <Text>Priority:</Text>
          <Text>{getPriority(project.priority)}</Text>
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
            <Text>Priority:</Text>
            <Text>{getPriority(project.priority)}</Text>
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
        <Flex justify="space-between">
          <Button onClick={delOpen}>Delete project</Button>
          <Button component="a" href={"/admin/project/" + project.id}>
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
        <Text className="text-3xl">Warning! {project.name}</Text>
        <Text className="text-lg">
          Are you sure you want to delete this project? It will remove all the
          tasks and sub-tasks
        </Text>
        <Flex className="mt-[20px] justify-evenly">
          <Button onClick={deleteProject}> Yes</Button>
          <Button onClick={delClose}> No</Button>
        </Flex>
      </Modal>
    </>
  );
};

export default ProjectCard;
