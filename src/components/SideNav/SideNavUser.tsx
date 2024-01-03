import {
  Avatar,
  Box,
  Flex,
  Text,
  Skeleton,
  Button,
  Tooltip,
} from "@mantine/core";
import { UserNavLinks } from "./NavLinks";
import { Link, useNavigate } from "react-router-dom";
import {
  IconCalendar,
  IconDeviceAnalytics,
  IconHome,
  IconTargetArrow,
} from "@tabler/icons-react";
const SideNav = ({ user, opened }: { user: User; opened: boolean }) => {
  const navigate = useNavigate();

  return (
    <>
      <Flex align="center" mt={"10px"}>
        <Box className="mr-8">
          <Avatar />
        </Box>
        {/* {opened && <Text truncate="end">{user?.name || ""}</Text>} */}
      </Flex>
      {opened && (
        <Flex
          className="mt-20"
          direction="column"
          align="center"
          justify="center"
        >
          {/* <Text className="text-3xl mb-4">Functions</Text> */}
          <Flex className="gap-y-2 h-1/1 flex-col justify-evenly">
            {/* <IconTargetArrow/> */}
            <Tooltip label="Home">
              <IconHome
                onClick={() => navigate("/user/allotedSubtasks")}
                className="mt-[10px]"
              />
            </Tooltip>
            <Tooltip label="View all Projects">
              <IconTargetArrow
                onClick={() => navigate("/user/projects")}
                className="mt-[10px]"
              />
            </Tooltip>
            <Tooltip label="Analytics">
              <IconDeviceAnalytics
                onClick={() => navigate("/user/analytics")}
                className="mt-[10px]"
              />
            </Tooltip>
            <Tooltip label="Calendar">
              <IconCalendar
                onClick={() => navigate("/user/viewCalendar")}
                className="mt-[10px]"
              />
            </Tooltip>
            {/* {UserNavLinks.map((link, index) => (
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
      )}
    </>
  );
};

export default SideNav;
