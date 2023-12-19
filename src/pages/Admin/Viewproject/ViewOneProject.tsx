import { Flex } from "@mantine/core";
import { TaskCard } from "../../../components";
import { useParams, useNavigate } from "react-router-dom";
import { Key, useEffect, useState } from "react";
import { showNotification } from "../../../helpers/helpers";
import { fetchTasksForProject } from "../../../helpers/apiCalls";

const Home = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [taskResponse, setTaskResponse] = useState<TasksOfProjectResponse>({
    projectId: "",
    projectName: "",
    tasks: [],
  });
  const fetchTasksOfProject = async (id: string) => {
    try {
      const response = await fetchTasksForProject(id);
      if (response.status === 200) {
        setTaskResponse(response.data.data);
      } else {
        showNotification("Error", response.data.message, "error");
        navigate("/admin/viewProject");
        return;
      }
    } catch {
      showNotification("Error", "Internal server error", "error");
      navigate("/login");
      return;
    }
  };

  useEffect(() => {
    if (projectId == undefined) {
      showNotification("Warning", "Given project doesn't exist", "warning");
      navigate("/admin/viewProject");
      return;
    }
    fetchTasksOfProject(projectId);
  }, [projectId]);

  const arr = [...new Array(10).fill(0)];
  return (
    <>
      <Flex wrap="wrap" justify="space-around">
        {taskResponse.tasks.length > 0 &&
          taskResponse.tasks.map((task, i) => {
            return (
              <TaskCard
                key={i}
                task={task}
                projectId={taskResponse.projectId}
                projectName={taskResponse.projectName}
              />
            );
          })}
      </Flex>
    </>
  );
};

export default Home;
