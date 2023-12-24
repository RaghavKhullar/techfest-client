import { Avatar, Box, Flex, Text, Skeleton } from "@mantine/core";
import { AdminNavLinks } from "./NavLinks";
import { Link } from "react-router-dom";
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
        {AdminNavLinks.map((link, index) => (
          <Text key={index} h={28} mt="sm" component={Link} to={link.link}>
            {link.name}
          </Text>
        ))}
      </Flex>
    </>
  );
};

export default SideNav;
