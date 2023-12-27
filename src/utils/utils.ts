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

export const getStatus = (status: string) => {
  switch (status) {
    case "todo":
      return "To-Do";
    case "complete":
      return "Completed";
    case "progress":
      return "In Progress";
    default:
      return "To-Do";
  }
};

export const getMoralScore = (moral: string) => {
  switch (moral) {
    case "Very Low":
      return 1;
    case "Low":
      return 2;
    case "Moderate":
      return 3;
    case "High":
      return 4;
    case "Very High":
      return 5;
    default:
      return 0;
  }
};

export const getColorsFromScore = (score: number) => {
  switch (score) {
    case 1:
      return "#3498db";
    case 2:
      return "#2ecc71";
    case 3:
      return "#9b59b6";
    case 4:
      return "#e67e22";
    case 5:
      return "#e74c3c";
    case 0:
      return "#000000";
    default:
      return "#ffffff";
  }
};

export const gender = ["Male", "Female"];
export const role = ["HR", "Backend Developer", "Frontend Developer", "R&D"];
export const moral = ["Very Low", "Low", "Moderate", "High", "Very High"];
export const position = ["Senior", "Junior"];

export const getFormattedDate = (date: Date) => {
  const yyyy = date.getFullYear();
  let mm: any = date.getMonth() + 1; // Months start at 0!
  let dd: any = date.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  return dd + "/" + mm + "/" + yyyy;
};
