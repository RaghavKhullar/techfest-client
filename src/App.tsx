import Router from "./routes";
import { MantineProvider } from "@mantine/core";
import theme from "./utils/theme";
import "./App.css";
import { ErrorBoundary } from "react-error-boundary";
import { FallbackUI } from "./components";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/dates/styles.css";

const App = () => {
  return (
    <ErrorBoundary
      FallbackComponent={FallbackUI}
      onError={(error: Error) => {
        console.error(error);
      }}
    >
      <MantineProvider theme={theme}>
        <Notifications />
        <Router />
      </MantineProvider>
    </ErrorBoundary>
  );
};

export default App;
