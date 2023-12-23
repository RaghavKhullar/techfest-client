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
