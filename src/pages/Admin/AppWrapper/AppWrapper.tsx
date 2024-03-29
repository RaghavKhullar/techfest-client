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
import { SideNavAdmin } from "../../../components";
const AdminAppShell = () => {
  const [opened, { toggle }] = useDisclosure(true);
  const { user } = useAuthAdmin();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: opened ? "4vw" : "0vw",
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        {/* <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} size="sm" />
        </Group> */}
      </AppShell.Header>
      {opened && user && (
        <AppShell.Navbar p="md">
          <SideNavAdmin user={user} />
        </AppShell.Navbar>
      )}

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default AdminAppShell;
