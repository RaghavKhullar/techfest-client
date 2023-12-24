interface ChildTasks {
  name: string;
  id: string;
}

interface AllProjectResponse {
  name: string;
  deadline: Date;
  id: string;
  status: string;
  childTasks: ChildTasks[];
  description: string;
  priority: number;
  creationTime: Date;
}

interface TasksOfProjectResponse {
  tasks: AllProjectResponse[];
  projectName: string;
  projectId: string;
}

interface UserSubTask {
  name: string;
  id: string;
  image: string;
}

interface SubTaskResponse {
  name: string;
  deadline: Date;
  id: string;
  status: string;
  allotedUsers: UserSubTask;
  description: string;
  priority: number;
  document: string;
  userDocument: string;
  creationTime: Date;
}

interface SubTasksOfProjectResponse {
  projectName: string;
  projectId: string;
  taskName: string;
  taskId: string;
  subTasks: SubTaskResponse[];
}

interface UserResponseAdmin {
  name: string;
  id: string;
  email: string;
  // allotedTasks: Array<Types.ObjectId>;
  image: string;
  gender: string;
  age: number;
  isMarried: boolean;
  role: string;
  salary: number;
  position: string;
  absences: number;
  meanMonthlyHours: number;
  joiningDate: Date;
  currentRating: number; // 0-10 (given by admin)
  moral: string; // given by admin
  stressBurnoutScore: number; // ML model
}

interface AnalyticsSubtask {
  name: string;
  deadline: Date;
  priority: string;
  status: string;
}

interface AnalyticsData {
  absentDays: number;
  todoSubTask: number;
  completeSubTask: number;
  inProgressSubTask: number;
  currentRating: number;
  subTasks: AnalyticsSubtask[];
  stressBurnoutScore: number;
  moral: string;
}
interface User {
  _id: string;
  name: string;
}

interface AuthContextTypeUser {
  user?: User;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: boolean;
  isFetched: boolean;
}
