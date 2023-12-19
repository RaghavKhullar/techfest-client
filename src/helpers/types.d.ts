interface ChildTasks {
  name: String;
  id: String;
}

interface AllProjectResponse {
  name: String;
  deadline: Date | null;
  id: String;
  isCompleted: boolean;
  childTasks: ChildTasks[];
  description: String;
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
  name: String;
  deadline: Date | null;
  id: String;
  isCompleted: boolean;
  allotedUsers: UserSubTask[];
  description: String;
}

interface SubTasksOfProjectResponse {
  projectName: string;
  projectId: string;
  taskName: string;
  taskId: string;
  subTasks: SubTaskResponse[];
}
