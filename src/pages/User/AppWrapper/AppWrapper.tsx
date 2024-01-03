import {
  AppShell,
  Box,
  Burger,
  Flex,
  Group,
  Skeleton,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet, useNavigate } from "react-router-dom";
import useAuthAdmin from "../../../context/adminContext";
import { useEffect } from "react";
import { IconUser } from "@tabler/icons-react";
import { SideNavUser } from "../../../components";
import useAuthUser from "../../../context/userContext";
const AdminAppShell = () => {
  const [opened, { toggle }] = useDisclosure(true);
  const { user } = useAuthUser();

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  return (
    <AppShell
      header={{ height: 0.1 }}
      navbar={{
        width: opened ? "4vw" : "4vw",
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        {/* <Group h="100%" px="md">
        </Group> */}
      </AppShell.Header>
      {user && (
        <>
          <AppShell.Navbar p="md">
            {/* <Burger opened={opened} size="sm" /> */}
            <SideNavUser user={user} opened={opened} />
          </AppShell.Navbar>
        </>
      )}

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default AdminAppShell;
