import React from "react";
import Day from "./Day";
export default function Month({ month }: any) {
  return (
    <div className="flex-1 w-full pt-10 grid grid-cols-7 grid-rows-5">
      {month.map((row: any, i: any) => (
        <React.Fragment key={i}>
          {row.map((day: any, idx: any) => (
            <Day day={day} key={idx} rowIdx={i} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
