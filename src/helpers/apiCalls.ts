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

export const addProject = async (body: any) => {
  try {
    const response = await CustomAxios.post("/admin/addProject", body, {
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const addTask = async (body: any) => {
  try {
    const response = await CustomAxios.post("/admin/addTask", body, {
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const addSubTask = async (body: any) => {
  try {
    const response = await CustomAxios.post("/admin/addSubtask", body, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const removeProject = async (id: string) => {
  try {
    const response = await CustomAxios.post(
      "/admin/deleteProject",
      { projectId: id },
      { withCredentials: true }
    );
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const removeTask = async (body: {
  projectId: string;
  taskId: string;
}) => {
  try {
    const response = await CustomAxios.post("/admin/deleteTask", body, {
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const removeSubtask = async (body: any) => {
  try {
    const response = await CustomAxios.post("/admin/deleteSubtask", body, {
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const editProject = async (body: any) => {
  try {
    const response = await CustomAxios.post("/admin/editProject", body, {
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const editTask = async (body: any) => {
  try {
    const response = await CustomAxios.post("/admin/editTask", body, {
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const editSubtask = async (body: any) => {
  try {
    const response = await CustomAxios.post("/admin/editSubtask", body, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const addUser = async (body: any) => {
  try {
    const response = await CustomAxios.post("/admin/addUser", body, {
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const fetchAllUsers = async () => {
  try {
    const response = await CustomAxios.get("/admin/getAllUsers", {
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const editUserByAdmin = async (body: any) => {
  try {
    const response = await CustomAxios.post("/admin/updateUser", body, {
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const getUserAnalyticsDetails = async () => {
  try {
    const response = await CustomAxios.get("/user/getUserStats", {
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const fetchAllProjectsUser = async () => {
  try {
    const response = await CustomAxios.get("/user/getProjects", {
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const fetchTasksForProjectUser = async (projectId: string) => {
  try {
    const response = await CustomAxios.post(
      "/user/getTasks",
      { projectId: projectId },
      { withCredentials: true }
    );
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const fetchSubTasksForTaskUser = async (
  projectId: string,
  taskId: string
) => {
  try {
    const response = await CustomAxios.post(
      "/user/getSubTasks",
      { projectId: projectId, taskId: taskId },
      { withCredentials: true }
    );
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const editSubtaskUser = async (body: any) => {
  try {
    const response = await CustomAxios.post("/user/editSubtask", body, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const fetchAllotedSubTaskUser = async () => {
  try {
    const response = await CustomAxios.get("/user/getAllotedSubtasks", {
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const updateUserProfile = async (body: any) => {
  try {
    const response = await CustomAxios.post("/user/updateProfile", body, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const writeEmail = async (content: string) => {
  try {
    const response = await CustomAxios.post(
      "/user/writeEmail",
      { emailPoints: content },
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const improveWritingUser = async (content: string) => {
  try {
    const response = await CustomAxios.post(
      "/user/improveWriting",
      { text: content },
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const summariseText = async (content: string) => {
  try {
    const response = await CustomAxios.post(
      "/user/summariseText",
      { text: content },
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (e: any) {
    return e.response;
  }
}
export const getUserCalendar = async () => {
  try {
    const response = await CustomAxios.get("/user/getTasksCalendar", {
      withCredentials: true,
    });
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const generateSubtasks = async (taskId: string) => {
  try {
    const response = await CustomAxios.post(
      "/admin/generateSubtask",
      { taskId: taskId },
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (e: any) {
    return e.response;
  }
};

export const generateChat = async (query: string) => {
  try {
    const response = await CustomAxios.post(
      "/user/generateQuery",
      { query: query },
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (e: any) {
    return e.response;
  }
};
