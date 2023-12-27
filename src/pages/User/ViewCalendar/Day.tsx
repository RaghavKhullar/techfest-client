import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../../context/globalContext";
import { Link } from "react-router-dom";

export default function Day({ day, rowIdx, task = null }: any) {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
  } = useContext(GlobalContext);

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt: any) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }
  function getTaskClass() {
    if (task) console.log(task["projectId"], task["taskId"]);
    return task ? "bg-red-600 text-white rounded-full w-7" : "";
  }
  function handleTask() {
    if (task) {
    }
  }
  return (
    <div className="border border-gray-200 flex flex-col">
      <Link
        to={task ? `/user/task/${task["projectId"]}/${task["taskId"]}` : ""}
      >
        <header className="flex flex-col items-center">
          {rowIdx === 0 && (
            <p className="text-sm mt-1">{day.format("ddd").toUpperCase()}</p>
          )}
          <p
            className={`text-sm p-1 my-1 text-center  ${getCurrentDayClass()} ${getTaskClass()}`}
          >
            {day.format("DD")}
          </p>
          <div className={`${task ? "block" : "hidden"}`}>
            {task ? task["projectName"] : ""}
          </div>
        </header>
      </Link>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {dayEvents.map((evt: any, idx: any) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(evt)}
            className={`bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  );
}
