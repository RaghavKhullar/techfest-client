import { Flex } from "@mantine/core";
import {
  TableCard,
  AbsenceCard,
  ScoreMeters,
  UserCardAnalytics,
} from "../../../components";
import { useEffect, useState } from "react";
import { showNotification } from "../../../helpers/helpers";
import { useNavigate } from "react-router-dom";
import { getUserAnalyticsDetails } from "../../../helpers/apiCalls";
import { ChatBoxUi } from "../../../components";

const Home = () => {
  const [data, setData] = useState<AnalyticsData>({
    user: {
      id: "",
      name: "",
      email: "",
      image: "",
      gender: "Male",
      age: 0,
      isMarried: false,
      role: "HR",
      salary: 0,
      joiningDate: new Date(),
      position: "Intern",
    },
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
      <Flex className="flex-col justify-between h-full">
        <Flex className="w-full justify-evenly  mb-[3%]">
          <UserCardAnalytics
            user={data.user}
            getUserAnalytics={getUserAnalytics}
          />
          <TableCard
            toDo={data.todoSubTask}
            inProgress={data.inProgressSubTask}
            complete={data.completeSubTask}
            subTasks={data.subTasks}
          />
        </Flex>

        <Flex className="w-full flex-wrap justify-evenly">
          <AbsenceCard absentDays={data.absentDays} />
          <ScoreMeters
            currentRating={data.currentRating}
            stressBurnoutScore={data.stressBurnoutScore}
            moral={data.moral}
          />
        </Flex>
      </Flex>
      <ChatBoxUi delay={1} />
    </>
  );
};

export default Home;
