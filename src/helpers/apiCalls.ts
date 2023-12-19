import CustomAxios from "./CustomAxios";

export const fetchAllProjects = async () => {
  try {
    const response = await CustomAxios.get("/admin/getProjects", {
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const fetchTasksForProject = async (projectId: string) => {
  try {
    const response = await CustomAxios.post(
      "/admin/getTasks",
      { projectId: projectId },
      { withCredentials: true }
    );
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const fetchSubTasksForTask = async (
  projectId: string,
  taskId: string
) => {
  try {
    const response = await CustomAxios.post(
      "/admin/getSubTasks",
      { projectId: projectId, taskId: taskId },
      { withCredentials: true }
    );
    return response;
  } catch (e: any) {
    return e.response;
  }
};
