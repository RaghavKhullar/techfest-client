import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PageNotFound, AdminAppShell, UserAppShell } from "../pages";
import { MetaDecoratedPage, ProtectedRoutes } from "../components";
import { userRoutes } from "./user.routes";
import { adminRoutes } from "./admin.routes";
import { unprotectedRoutes } from "./routes";
import { AuthContextProviderAdmin } from "../context/adminContext";
import { AuthContextProviderUser } from "../context/userContext";
const Router = () => {
  return (
    <BrowserRouter>
      <AuthContextProviderAdmin>
        <ProtectedRoutes type="admin">
          <Routes>
            <Route element={<AdminAppShell />}>
              {adminRoutes.map((route) => {
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
            </Route>
          </Routes>
        </ProtectedRoutes>
      </AuthContextProviderAdmin>
      <AuthContextProviderUser>
        <ProtectedRoutes type="user">
          <Routes>
            <Route element={<UserAppShell />}>
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
            </Route>
          </Routes>
        </ProtectedRoutes>
      </AuthContextProviderUser>
      <Routes>
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
        {/* <Route
          path="*"
          element={
            <MetaDecoratedPage
              title="Not Found"
              description="This is the not found page of App"
              element={<PageNotFound />}
            />
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
