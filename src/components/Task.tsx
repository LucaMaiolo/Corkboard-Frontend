export interface Task {
  _id: string;
  listerId: string;
  name: string;
  description: string;
  location: string;
  pay: number;
  timeInMins: number;
  status: TaskStatus;
}

type TaskStatus = "Available" | "InProgress" | "Completed";
