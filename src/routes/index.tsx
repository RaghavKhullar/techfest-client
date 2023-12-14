
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PageNotFound } from "../pages";
import { MetaDecoratedPage } from "../components";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
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
