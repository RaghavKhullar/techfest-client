import {
  AdminHome,
  ViewAllProject,
  ViewOneProject,
  ViewTask,
  AddUser,
  ViewUser,
  ViewCalendar,
} from "../pages";

export const adminRoutes: RouteType[] = [
  {
    path: "/admin/home",
    element: <AdminHome />,
    title: "Admin Home",
    description: "Home page of admin",
  },
  {
    path: "/admin/viewProject",
    element: <ViewAllProject />,
    title: "Admin Home",
    description: "Home page of admin",
  },
  {
    path: "/admin/project/:projectId",
    element: <ViewOneProject />,
    title: "Admin Home",
    description: "Home page of admin",
  },
  {
    path: "/admin/task/:projectId/:taskId",
    element: <ViewTask />,
    title: "Admin Home",
    description: "Home page of admin",
  },
  {
    path: "/admin/addUser",
    element: <AddUser />,
    title: "Admin Home",
    description: "Home page of admin",
  },
  {
    path: "/admin/viewUsers",
    element: <ViewUser />,
    title: "Admin Home",
    description: "Home page of admin",
  },
  {
    path: "/admin/viewCalendar",
    element: <ViewCalendar />,
    title: "Admin Home",
    description: "Home page of admin",
  },
];
