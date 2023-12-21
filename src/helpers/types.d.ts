interface ChildTasks {
  name: string;
  id: string;
}

interface AllProjectResponse {
  name: string;
  deadline: Date | null;
  id: string;
  isCompleted: boolean;
  childTasks: ChildTasks[];
  description: string;
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
  deadline: Date | null;
  id: string;
  isCompleted: boolean;
  allotedUsers: UserSubTask;
  description: string;
}

interface SubTasksOfProjectResponse {
  projectName: string;
  projectId: string;
  taskName: string;
  taskId: string;
  subTasks: SubTaskResponse[];
}
