import { Flex } from "@mantine/core";
import { SubTaskCard } from "../../../components";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { showNotification } from "../../../helpers/helpers";
import { fetchSubTasksForTask } from "../../../helpers/apiCalls";

const Home = () => {
  const { projectId, taskId } = useParams();
  const navigate = useNavigate();
  const [subtaskResponse, setSubtaskResponse] =
    useState<SubTasksOfProjectResponse>({
      projectName: "",
      projectId: "",
      taskId: "",
      taskName: "",
      subTasks: [],
    });

  const fetchSubTasksOfProject = async (projectId: string, taskId: string) => {
    try {
      const response = await fetchSubTasksForTask(projectId, taskId);
      if (response.status === 200) {
        setSubtaskResponse(response.data.data);
      } else {
        showNotification("Error", response.data.message, "error");
        // navigate('/admin/viewProject');

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
      showNotification("Warning", "Invalid project", "warning");
      navigate("/admin/viewProject");
      return;
    } else if (taskId == undefined) {
      showNotification("Warning", "Invalid selected task", "warning");
      navigate("/admin/project/" + projectId);
      return;
    }
    fetchSubTasksOfProject(projectId, taskId);
  }, [projectId, taskId]);
  const arr = [...new Array(10).fill(0)];
  return (
    <>
      <Flex wrap="wrap" justify="space-around">
        {subtaskResponse.subTasks.map((val, i) => {
          return (
            <SubTaskCard
              subTask={val}
              projectId={subtaskResponse.projectId}
              projectName={subtaskResponse.projectName}
              taskName={subtaskResponse.taskName}
              taskId={subtaskResponse.taskId}
              key={i}
            />
          );
        })}
      </Flex>
    </>
  );
};

export default Home;
