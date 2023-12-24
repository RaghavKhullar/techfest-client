import { Center, Flex, Text, SegmentedControl } from "@mantine/core";
import { TaskCardUser } from "../../../components";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { showNotification } from "../../../helpers/helpers";
import { fetchTasksForProjectUser } from "../../../helpers/apiCalls";
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
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [taskResponse, setTaskResponse] = useState<TasksOfProjectResponse>({
    projectId: "",
    projectName: "",
    tasks: [],
  });
  const [sortFilter, setSortFilter] = useState<string>("default");
  const [filter, setFilter] = useState<string>("all");
  const [currTasks, setcurrTasks] = useState<AllProjectResponse[]>([]);

  const fetchTasksOfProject = async (id: string) => {
    try {
      const response = await fetchTasksForProjectUser(id);
      if (response.status === 200) {
        setTaskResponse(response.data.data);
      } else {
        showNotification("Error", response.data.message, "error");
        navigate("/user/viewProject");
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
      showNotification("Warning", "Given project doesn't exist", "warning");
      navigate("/user/viewProject");
      return;
    }
    fetchTasksOfProject(projectId);
  }, [projectId]);

  useEffect(() => {
    let arr = [];
    if (filter != "all") {
      arr = taskResponse.tasks.filter((subTask) => subTask.status == filter);
    } else {
      arr = taskResponse.tasks.filter(() => true);
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
    setcurrTasks(arr);
  }, [taskResponse.tasks, filter, sortFilter]);
  return (
    <>
      {taskResponse && taskResponse.projectId.length > 0 && (
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
            <Text className="text-3xl">{taskResponse.projectName}</Text>
          </Center>
        </>
      )}
      <Flex wrap="wrap" justify="space-around">
        {taskResponse.tasks.length > 0 &&
          currTasks.map((task, i) => {
            return (
              <TaskCardUser
                key={i}
                task={task}
                projectId={taskResponse.projectId}
                projectName={taskResponse.projectName}
                fetchTasksOfProject={fetchTasksOfProject}
              />
            );
          })}
      </Flex>
    </>
  );
};

export default Home;
