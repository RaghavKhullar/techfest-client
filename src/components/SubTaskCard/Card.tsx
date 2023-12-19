import { Avatar, Button, Card, Flex, Group, Modal, Text } from "@mantine/core";
import { useMediaQuery, useDisclosure } from "@mantine/hooks";

const SubTaskCard = ({
  subTask,
  taskId,
  taskName,
  projectId,
  projectName,
}: {
  subTask: SubTaskResponse;
  taskId: string;
  taskName: string;
  projectId: string;
  projectName: string;
}) => {
  const isMobile = useMediaQuery("max-width:600px");
  const [isModalOpen, { open, close }] = useDisclosure(false);
  const alottedUsers = [...new Array(4).fill({ image: "", name: "Hey" })];
  return (
    <>
      <Card
        shadow="xl"
        padding="md"
        className={`${!isMobile ? "w-[25%]" : "w-full"} m-[2rem]`}
      >
        <Flex justify="space-between">
          <Avatar />
          <Button onClick={open}> View</Button>
        </Flex>

        <Text>{subTask.name}</Text>

        <Flex>
          <Text>Description:</Text>
          <Text>
            {subTask.description.length > 0
              ? subTask.description
              : "No description"}
          </Text>
        </Flex>
      </Card>
      <Modal
        opened={isModalOpen}
        onClose={close}
        title="Subtask Name"
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Group>
          <Text>Alloted to:</Text>
          {subTask.allotedUsers.map((user, i) => {
            return (
              <>
                <Flex justify="space-between" align="center" key={i}>
                  <Avatar src={user.image} />
                  <Text> {user.name}</Text>
                </Flex>
              </>
            );
          })}
        </Group>
        <Group>
          <Text>Description</Text>
        </Group>
      </Modal>
    </>
  );
};

export default SubTaskCard;
