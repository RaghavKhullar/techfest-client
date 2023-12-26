import React, { useState, useEffect, useReducer, useMemo } from "react";
import dayjs from "dayjs";

function savedEventsReducer(state: any, { type, payload }: any) {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((evt: any) => (evt.id === payload.id ? payload : evt));
    case "delete":
      return state.filter((evt: any) => evt.id !== payload.id);
    default:
      throw new Error();
  }
}
function initEvents() {
  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
}

export function ContextWrapper(props: any) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState<number | null>(
    null
  );
  const [daySelected, setDaySelected] = useState<dayjs.Dayjs | null>(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [labels, setLabels] = useState<any>([]);
  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [],
    initEvents
  );

  const filteredEvents = useMemo(() => {
    return savedEvents.filter((evt: any) =>
      labels
        .filter((lbl: any) => lbl.checked)
        .map((lbl: any) => lbl.label)
        .includes(evt.label)
    );
  }, [savedEvents, labels]);

  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  useEffect(() => {
    setLabels((prevLabels: any) => {
      return [...new Set(savedEvents.map((evt: any) => evt.label))].map(
        (label) => {
          const currentLabel = prevLabels.find(
            (lbl: any) => lbl.label === label
          );
          return {
            label,
            checked: currentLabel ? currentLabel.checked : true,
          };
        }
      );
    });
  }, [savedEvents]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);

  function updateLabel(label: any) {
    setLabels(
      labels.map((lbl: any) => (lbl.label === label.label ? label : lbl))
    );
  }

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        dispatchCalEvent,
        selectedEvent,
        setSelectedEvent,
        savedEvents,
        setLabels,
        labels,
        updateLabel,
        filteredEvents,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}

export const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: (index: any) => {},
  smallCalendarMonth: 0 as number | null,
  setSmallCalendarMonth: (index: any) => {},
  daySelected: null as dayjs.Dayjs | null,
  setDaySelected: (day: any) => {},
  showEventModal: false,
  setShowEventModal: (bool: boolean) => {},
  dispatchCalEvent: ({ type, payload }: any) => {},
  savedEvents: [],
  selectedEvent: null,
  setSelectedEvent: (evt: any) => {},
  setLabels: (label: any) => {},
  labels: [],
  updateLabel: (label: any) => {},
  filteredEvents: [],
});
