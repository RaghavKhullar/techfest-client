import {
  Avatar,
  Box,
  Flex,
  Text,
  Skeleton,
  Button,
  Tooltip,
} from "@mantine/core";
import { AdminNavLinks } from "./NavLinks";
import { Link, useNavigate } from "react-router-dom";
import {
  IconListDetails,
  IconTargetArrow,
  IconUserScan,
  IconUsersPlus,
} from "@tabler/icons-react";
const SideNav = ({ user }: { user: User }) => {
  const navigate = useNavigate();
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
        {/* <Text className="text-3xl mb-4">Functions</Text> */}
        <Flex className="gap-y-2 h-1/1 flex-col justify-evenly">
          {/* <Tooltip label="View all Projects">
            <IconListDetails onClick={() => navigate("/admin/viewProject")} />
          </Tooltip> */}
          {/* <Tooltip label="Home">
            <IconHome onClick={() => navigate("/user/allotedSubtasks")} className="mt-[10px]" />
          </Tooltip> */}
          <Tooltip label="View all Projects">
            <IconTargetArrow
              onClick={() => navigate("/admin/viewProject")}
              className="mt-[10px]"
            />
          </Tooltip>
          <Tooltip label="Add User">
            <IconUsersPlus
              onClick={() => navigate("/admin/addUser")}
              className="mt-[10px]"
            />
          </Tooltip>
          <Tooltip label="View All Users">
            <IconUserScan
              onClick={() => navigate("/admin/viewUsers")}
              className="mt-[10px]"
            />
          </Tooltip>
          {/* {AdminNavLinks.map((link, index) => (
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
          ))} */}
        </Flex>
      </Flex>
    </>
  );
};

export default SideNav;
