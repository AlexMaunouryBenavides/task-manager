import type { ResultSetHeader, RowDataPacket } from "mysql2";
import databaseClient from "../../../database/client";
import type ITask from "../interfaces/ITask";

type ITaskRow = ITask & RowDataPacket;

class TaskRepository {
  async create(
    task: Omit<ITask, "id" | "created_at" | "updated_at" | "status">,
  ): Promise<number> {
    const [result] = await databaseClient.query<ResultSetHeader>(
      "insert into task (title,description,project_id) values (?,?,?)",
      [task.title, task.description, task.project_id],
    );
    if (result.affectedRows === 0) {
      throw new Error("insert failed");
    }
    return result.insertId;
  }
  async read(id: number): Promise<ITask | undefined> {
    const [rows] = await databaseClient.query<ITaskRow[]>(
      "select * from task where id=?",
      [id],
    );
    return rows[0];
  }
  async readAll(): Promise<ITask[]> {
    const [rows] = await databaseClient.query<ITaskRow[]>("select * from task");
    return rows;
  }
  async update(id: number, task: Partial<ITask>): Promise<boolean> {
    const columns = Object.keys(task);
    if (columns.length === 0) return false;

    const setColumns = columns.map((col) => `${col} = ?`).join(", ");

    const values = [...Object.values(task), id];

    const [result] = await databaseClient.query<ResultSetHeader>(
      `update task set ${setColumns} where id = ?`,
      values,
    );
    return result.affectedRows > 0;
  }

  async delete(id: number): Promise<boolean> {
    const [result] = await databaseClient.query<ResultSetHeader>(
      "delete from task where id = ?",
      [id],
    );
    return result.affectedRows > 0;
  }
}

export default new TaskRepository();
