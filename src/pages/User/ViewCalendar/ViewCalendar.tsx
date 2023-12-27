import React, { useContext, useEffect, useState } from "react";
import SmallCalendar from "./SmallCalendar";
import { Flex } from "@mantine/core";
import Month from "./Month";
import { getMonth } from "../../../utils/calendarUtils";
import { GlobalContext } from "../../../context/globalContext";
import { getUserCalendar } from "../../../helpers/apiCalls";
import Labels from "./Label";
import { showNotification } from "../../../helpers/helpers";

function ViewCalendar(): any {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, smallCalendarMonth, showEventModal } =
    useContext(GlobalContext);
  const [deadlines, setDeadlines] = useState();
  const getDealines = async () => {
    try {
      const response = await getUserCalendar();
      if (response.status === 200) {
        setDeadlines(response.data.data);
      } else {
        showNotification("Error", response.data.message, "error");
        return;
      }
    } catch {
      showNotification("Error", "Internal server error", "error");
      return;
    }
  };
  useEffect(() => {
    getDealines();
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);
  return (
    <Flex className="h-full w-full flex-col justify-around items-center">
      <Flex justify={"space-around"}>
        <SmallCalendar />
        {/* <Labels/> */}
      </Flex>
      <Month month={currenMonth} deadlines={deadlines} />
    </Flex>
  );
}

export default ViewCalendar;
