interface ChildTasks {
  name: string;
  id: string;
}

interface AllProjectResponse {
  name: string;
  deadline: Date | null;
  id: string;
  status: string;
  childTasks: ChildTasks[];
  description: string;
  priority: number;
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
  status: string;
  allotedUsers: UserSubTask;
  description: string;
  priority: number;
}

interface SubTasksOfProjectResponse {
  projectName: string;
  projectId: string;
  taskName: string;
  taskId: string;
  subTasks: SubTaskResponse[];
}
