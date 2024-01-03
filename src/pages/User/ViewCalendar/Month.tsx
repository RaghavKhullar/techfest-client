import React, { useContext, useEffect, useState } from "react";
import Day from "./Day";
import { GlobalContext } from "../../../context/globalContext";

export default function Month({ month, deadlines }: any) {
  const { monthIndex, year } = useContext(GlobalContext);
  const [currentDeadlines, setCurrentDeadlines] = useState<{
    [key: string]: object;
  }>({});
  useEffect(() => {
    setCurrentDeadlines({});
    if (deadlines && deadlines[year] && deadlines[year][monthIndex]) {
      deadlines[year][monthIndex].forEach((task: any) => {
        setCurrentDeadlines((prevDeadlines) => {
          const newState: { [key: string]: object } = prevDeadlines;
          const date = task["deadline"].slice(8, 10);
          newState[`${date}`] = task;
          return newState;
        });
      });
    }
  }, [deadlines, year, month]);
  return (
    <div className="flex-1 w-full pt-10 grid grid-cols-7 grid-rows-5">
      {month.map((row: any, i: any) => (
        <React.Fragment key={i}>
          {row.map((day: any, idx: any) => {
            if (currentDeadlines[day.format("DD")]) {
              return (
                <Day
                  day={day}
                  key={idx}
                  rowIdx={i}
                  task={currentDeadlines[day.format("DD")]}
                />
              );
            } else {
              return <Day day={day} key={idx} rowIdx={i} />;
            }
          })}
        </React.Fragment>
      ))}
    </div>
  );
}
