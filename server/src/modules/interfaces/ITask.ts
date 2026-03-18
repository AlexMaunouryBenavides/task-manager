export enum TodoStatus {
  TODO = "todo",
  INPROGRESS = "in_progress",
  DONE = "done",
}
export default interface ITask {
  id: number;
  title: string;
  description: string | null;
  status: TodoStatus;
  created_at: Date | string;
  updated_at: Date | string;
  project_id: number;
}
