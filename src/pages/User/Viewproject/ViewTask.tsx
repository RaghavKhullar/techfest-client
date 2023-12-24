import {
  Box,
  Button,
  Center,
  Flex,
  Text,
  SegmentedControl,
} from "@mantine/core";
import { SubTaskCardUser } from "../../../components";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { showNotification } from "../../../helpers/helpers";
import { fetchSubTasksForTaskUser } from "../../../helpers/apiCalls";
import {
  IconCalendar,
  IconCalendarClock,
  IconCalendarDue,
  IconClearAll,
  IconDiscountCheckFilled,
  IconProgress,
  IconShieldHalfFilled,
} from "@tabler/icons-react";

const Home = () => {
  const { projectId, taskId } = useParams();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>("all");
  const [sortFilter, setSortFilter] = useState<string>("default");
  const [subtaskResponse, setSubtaskResponse] =
    useState<SubTasksOfProjectResponse>({
      projectName: "",
      projectId: "",
      taskId: "",
      taskName: "",
      subTasks: [],
    });
  const [currSubTasks, setCurrSubTasks] = useState<SubTaskResponse[]>([]);

  const fetchSubTasksOfProject = async (projectId: string, taskId: string) => {
    try {
      const response = await fetchSubTasksForTaskUser(projectId, taskId);
      if (response.status === 200) {
        setSubtaskResponse(response.data.data);
      } else {
        showNotification("Error", response.data.message, "error");
        navigate("/user/project/" + projectId);
        return;
      }
    } catch {
      showNotification("Error", "Internal server error", "error");
      navigate("/login");
      return;
    }
  };
  useEffect(() => {
    if (projectId == undefined || projectId == "undefined") {
      showNotification("Warning", "Invalid project", "warning");
      navigate("/user/viewProject");
      return;
    } else if (taskId == undefined || taskId == "undefined") {
      showNotification("Warning", "Invalid selected task", "warning");
      navigate("/user/project/" + projectId);
      return;
    }
    fetchSubTasksOfProject(projectId, taskId);
  }, [projectId, taskId]);

  useEffect(() => {
    let arr = [];
    if (filter != "all") {
      arr = subtaskResponse.subTasks.filter(
        (subTask) => subTask.status == filter
      );
    } else {
      arr = subtaskResponse.subTasks.filter(() => true);
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
    setCurrSubTasks(arr);
  }, [subtaskResponse.subTasks, filter, sortFilter]);

  return (
    <>
      {subtaskResponse && subtaskResponse.projectId.length > 0 && (
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
          <Center className="mb-[20px] mt-[20px]">
            <Text className="text-3xl">
              Project: {subtaskResponse.projectName}
            </Text>
          </Center>
          <Center className="mb-[20px]">
            <Text className="text-3xl">Task: {subtaskResponse.taskName}</Text>
          </Center>
        </>
      )}

      <Flex wrap="wrap" justify="space-around">
        {subtaskResponse.subTasks.length > 0 &&
          currSubTasks.map((val, i) => {
            return (
              <SubTaskCardUser
                subTask={val}
                projectId={subtaskResponse.projectId}
                projectName={subtaskResponse.projectName}
                taskName={subtaskResponse.taskName}
                taskId={subtaskResponse.taskId}
                key={i}
                fetchSubTasksOfProject={fetchSubTasksOfProject}
              />
            );
          })}
      </Flex>
    </>
  );
};

export default Home;
