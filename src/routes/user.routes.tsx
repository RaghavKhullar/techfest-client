import {
  UserHome,
  ViewAllProjectUser,
  ViewOneProjectUser,
  ViewTaskUser,
  ViewAllotedSubTasksUser,
} from "../pages";

export const userRoutes: RouteType[] = [
  {
    path: "/user/home",
    element: <UserHome />,
    title: "User Home",
    description: "Home page of user",
  },
  {
    path: "/user/projects",
    element: <ViewAllProjectUser />,
    title: "All projects",
    description: "All projects existing",
  },
  {
    path: "/user/project/:projectId",
    element: <ViewOneProjectUser />,
    title: "One Project",
    description: "One project",
  },
  {
    path: "/user/task/:projectId/:taskId",
    element: <ViewTaskUser />,
    title: "One Task",
    description: "",
  },
  {
    path: "/user/allotedSubtasks",
    element: <ViewAllotedSubTasksUser />,
    title: "Allotted Subtasks",
    description: "Alloted Tasks to user",
  },
];
