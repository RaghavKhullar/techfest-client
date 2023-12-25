import { Avatar, Box, Flex, Text, Skeleton } from "@mantine/core";
import { UserNavLinks } from "./NavLinks";
import { Link } from "react-router-dom";
const SideNav = ({ user, opened }: { user: User; opened: boolean }) => {
  return (
    <>
      <Flex align="center" mt={"10px"}>
        <Box className="mr-8">
          <Avatar />
        </Box>
        {opened && <Text truncate="end">{user?.name || ""}</Text>}
      </Flex>
      {opened && (
        <Flex
          className="mt-20"
          direction="column"
          align="center"
          justify="center"
        >
          <Text className="text-3xl mb-4">Functions</Text>
          {UserNavLinks.map((link, index) => (
            <Text key={index} h={28} mt="sm" component={Link} to={link.link}>
              {link.name}
            </Text>
          ))}
        </Flex>
      )}
    </>
  );
};

export default SideNav;
