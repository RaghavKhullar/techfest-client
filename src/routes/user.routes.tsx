import {
  UserHome,
  ViewAllProjectUser,
  ViewOneProjectUser,
  ViewTaskUser,
} from "../pages";

export const userRoutes: RouteType[] = [
  {
    path: "/user/home",
    element: <UserHome />,
    title: "User Home",
    description: "Home page of admin",
  },
  {
    path: "/user/projects",
    element: <ViewAllProjectUser />,
    title: "User Project",
    description: "Home page of admin",
  },
  {
    path: "/user/project/:projectId",
    element: <ViewOneProjectUser />,
    title: "Admin Home",
    description: "Home page of admin",
  },
  {
    path: "/user/task/:projectId/:taskId",
    element: <ViewTaskUser />,
    title: "Admin Home",
    description: "Home page of admin",
  },
];
