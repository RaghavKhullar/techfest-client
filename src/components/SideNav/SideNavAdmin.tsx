import { Avatar, Box, Flex, Text, Skeleton, Button } from "@mantine/core";
import { AdminNavLinks } from "./NavLinks";
import { Link } from "react-router-dom";
import SmallCalendar from "../../pages/Admin/ViewCalendar/SmallCalendar";
const SideNav = ({ user }: { user: User }) => {
  return (
    <>
      <Flex align="center">
        <Box className="mr-8">
          <Avatar />
        </Box>
        <Text truncate="end">{user?.name || ""}</Text>
      </Flex>
      <Flex
        className="mt-20"
        direction="column"
        align="center"
        justify="center"
      >
        <Text className="text-3xl mb-4">Functions</Text>
        <Flex className="gap-y-2 h-1/1 flex-col justify-evenly">
          {AdminNavLinks.map((link, index) => (
            <Button size="compact-md">
              <Text
                fw={500}
                size="md"
                key={index}
                h={28}
                component={Link}
                to={link.link}
              >
                {link.name}
              </Text>
            </Button>
          ))}
        </Flex>
      </Flex>
    </>
  );
};

export default SideNav;
