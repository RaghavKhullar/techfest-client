import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PageNotFound } from "../pages";
import { MetaDecoratedPage, ProtectedRoutes } from "../components";
import { userRoutes } from "./user.routes";
import { adminRoutes } from "./admin.routes";
import { unprotectedRoutes } from "./routes";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {adminRoutes.map((route) => {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <ProtectedRoutes type="admin">
                  <MetaDecoratedPage
                    title={route.title}
                    description={route.description}
                    element={route.element}
                  />
                </ProtectedRoutes>
              }
            >
              {route.children}
            </Route>
          );
        })}
        {userRoutes.map((route) => {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <ProtectedRoutes type="user">
                  <MetaDecoratedPage
                    title={route.title}
                    description={route.description}
                    element={route.element}
                  />
                </ProtectedRoutes>
              }
            >
              {route.children}
            </Route>
          );
        })}
        {unprotectedRoutes.map((route) => {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <MetaDecoratedPage
                  title={route.title}
                  description={route.description}
                  element={route.element}
                />
              }
            >
              {route.children}
            </Route>
          );
        })}
        <Route
          path="*"
          element={
            <MetaDecoratedPage
              title="Not Found"
              description="This is the not found page of App"
              element={<PageNotFound />}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
