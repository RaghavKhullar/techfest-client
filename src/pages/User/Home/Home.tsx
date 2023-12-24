import { Flex } from "@mantine/core";
import { TableCard, AbsenceCard, ScoreMeters } from "../../../components";
import { useEffect, useState } from "react";
import { showNotification } from "../../../helpers/helpers";
import { useNavigate } from "react-router-dom";
import { getUserAnalyticsDetails } from "../../../helpers/apiCalls";

const Home = () => {
  const [data, setData] = useState<AnalyticsData>({
    absentDays: 0,
    todoSubTask: 0,
    completeSubTask: 0,
    inProgressSubTask: 0,
    subTasks: [],
    currentRating: 0,
    stressBurnoutScore: 0,
    moral: "Moderate",
  });
  const navigate = useNavigate();
  const getUserAnalytics = async () => {
    try {
      const response = await getUserAnalyticsDetails();
      if (response.status === 200) {
        setData(response.data);
      } else {
        showNotification("Error", response.data.message, "error");
        return;
      }
    } catch {
      showNotification("Error", "Internal server error", "error");
      navigate("/login");
      return;
    }
  };
  useEffect(() => {
    getUserAnalytics();
  }, []);

  return (
    <>
      <Flex className="flex-wrap justify-evenly">
        <TableCard
          toDo={data.todoSubTask}
          inProgress={data.inProgressSubTask}
          complete={data.completeSubTask}
          subTasks={data.subTasks}
        />
        <Flex className="w-[45%] flex-col justify-between">
          <AbsenceCard absentDays={data.absentDays} />
          <ScoreMeters
            currentRating={data.currentRating}
            stressBurnoutScore={data.stressBurnoutScore}
            moral={data.moral}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default Home;
