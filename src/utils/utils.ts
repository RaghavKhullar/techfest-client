export const priorityMap = {
  LOW: 0,
  MEDIUM: 1,
  HIGH: 2,
};

export const getPriority = (prio: number) => {
  switch (prio) {
    case 0:
      return "Low";
    case 1:
      return "Medium";
    case 2:
      return "High";
    default:
      return "Nil";
  }
};
