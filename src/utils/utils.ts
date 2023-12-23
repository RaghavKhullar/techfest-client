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

export const gender = ["Male", "Female"];
export const role = ["HR", "Backend", "Frontend"];
export const moral = ["Very Low", "Low", "Moderate", "High", "Very High"];
export const position = ["Senior", "Junior", "Intern"];
