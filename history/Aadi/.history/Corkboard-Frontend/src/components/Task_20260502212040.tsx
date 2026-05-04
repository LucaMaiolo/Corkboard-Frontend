export interface Task {
  _id: string;
  name: string;
  description: string;
  location: string;
  pay: number;
  timeInMins: number;
  status: TaskStatus;
}

type TaskStatus = "AVAILABLE" | "INPROGRESS" | "COMPLETED";
