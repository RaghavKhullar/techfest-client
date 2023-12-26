import React, { useContext, useEffect, useState } from "react";
import SmallCalendar from "./SmallCalendar";
import { Flex } from "@mantine/core";
import Month from "./Month";
import { getMonth } from "../../../utils/calendarUtils";
import { GlobalContext } from "../../../context/globalContext";
import Labels from "./Labels";

function ViewCalendar() {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    console.log(monthIndex);
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);
  return (
    <Flex className="h-full w-full flex-col justify-around items-center">
      <Flex justify={"space-around"}>
        <SmallCalendar />
        {/* <Labels/> */}
      </Flex>
      <Month month={currenMonth} />
    </Flex>
  );
}

export default ViewCalendar;
