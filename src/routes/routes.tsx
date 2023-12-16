import { Login } from "../pages";
export const unprotectedRoutes: RouteType[] = [
  {
    path: "/login",
    element: <Login />,
    title: "Login",
    description: "Login Page of App",
  },
];
