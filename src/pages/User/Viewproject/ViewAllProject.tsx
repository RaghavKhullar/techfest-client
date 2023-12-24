import {
  Box,
  Button,
  Center,
  Flex,
  Group,
  Modal,
  TextInput,
  Text,
  SegmentedControl,
} from "@mantine/core";
import { ProjectCardUser } from "../../../components";
import { useEffect, useState } from "react";
import { fetchAllProjectsUser } from "../../../helpers/apiCalls";
import { showNotification } from "../../../helpers/helpers";
import { useNavigate } from "react-router-dom";
import {
  IconCalendar,
  IconCalendarClock,
  IconCalendarDue,
  IconClearAll,
  IconDiscountCheckFilled,
  IconProgress,
  IconShieldHalfFilled,
} from "@tabler/icons-react";
import { priorityMap } from "../../../utils/utils";

const Home = () => {
  const [projects, setProjects] = useState<AllProjectResponse[]>([]);
  const [sortFilter, setSortFilter] = useState<string>("default");

  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>("all");
  const [currProjects, setcurrProjects] = useState<AllProjectResponse[]>([]);

  const fetchProjects = async () => {
    try {
      const response = await fetchAllProjectsUser();
      if (response.status === 200) {
        setProjects(response.data.data);
      } else {
        showNotification("Error", response.data.message, "error");
        navigate("/user/home");
        return;
      }
    } catch {
      showNotification("Error", "Internal server error", "error");
      navigate("/login");
      return;
    }
  };
  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    let arr = [];
    if (filter != "all") {
      arr = projects.filter((subTask) => subTask.status == filter);
    } else {
      arr = projects.filter(() => true);
    }

    if (sortFilter == "priority") {
      arr.sort((a, b) => {
        return b.priority - a.priority;
      });
    } else if (sortFilter == "deadline") {
      arr.sort((a, b) => {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      });
    } else if (sortFilter == "start date") {
      arr.sort((a, b) => {
        return (
          new Date(a.creationTime).getTime() -
          new Date(b.creationTime).getTime()
        );
      });
    }
    setcurrProjects(arr);
  }, [projects, filter, sortFilter]);
  return (
    <>
      <Flex className="justify-around items-center">
        <Flex className="items-center">
          <Text className="text-lg">Filter Tasks:</Text>
          <SegmentedControl
            value={filter}
            onChange={setFilter}
            data={[
              {
                value: "all",
                label: (
                  <Center style={{ gap: 10 }}>
                    <IconClearAll />
                    <span>All</span>
                  </Center>
                ),
              },
              {
                value: "todo",
                label: (
                  <Center style={{ gap: 10 }}>
                    <IconCalendarDue />
                    <span>To-Do</span>
                  </Center>
                ),
              },
              {
                value: "progress",
                label: (
                  <Center style={{ gap: 10 }}>
                    <IconProgress />
                    <span>In Progress</span>
                  </Center>
                ),
              },
              {
                value: "complete",
                label: (
                  <Center style={{ gap: 10 }}>
                    <IconDiscountCheckFilled />
                    <span>Complete</span>
                  </Center>
                ),
              },
            ]}
            transitionDuration={200}
            transitionTimingFunction="linear"
          />
        </Flex>
        <Flex className="items-center">
          <Text className="text-lg">Sort By:</Text>
          <SegmentedControl
            value={sortFilter}
            onChange={setSortFilter}
            data={[
              {
                value: "default",
                label: (
                  <Center style={{ gap: 10 }}>
                    <IconClearAll />
                    <span>Default</span>
                  </Center>
                ),
              },
              {
                value: "priority",
                label: (
                  <Center style={{ gap: 10 }}>
                    <IconShieldHalfFilled />
                    <span>Priority</span>
                  </Center>
                ),
              },
              {
                value: "deadline",
                label: (
                  <Center style={{ gap: 10 }}>
                    <IconCalendarClock />
                    <span>Due date</span>
                  </Center>
                ),
              },
              {
                value: "start date",
                label: (
                  <Center style={{ gap: 10 }}>
                    <IconCalendar />
                    <span>Start date</span>
                  </Center>
                ),
              },
            ]}
            transitionDuration={200}
            transitionTimingFunction="linear"
          />
        </Flex>
      </Flex>
      <Center className="mb-[20px]">
        <Text className="text-3xl">All projects</Text>
      </Center>
      <Flex wrap="wrap" justify="space-around">
        {projects.length > 0 &&
          currProjects.map((project: AllProjectResponse, i) => {
            return (
              <ProjectCardUser
                key={i}
                project={project}
                fetchProjects={fetchProjects}
              />
            );
          })}
      </Flex>
    </>
  );
};

export default Home;
