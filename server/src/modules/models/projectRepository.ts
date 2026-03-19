import type { ResultSetHeader, RowDataPacket } from "mysql2";
import databaseClient from "../../../database/client";
import type IProject from "../interfaces/IProject";

type IProjectRow = IProject & RowDataPacket;

class ProjectRepository {
  async create(
    project: Omit<IProject, "id" | "created_at" | "updated_at">,
  ): Promise<number> {
    const [result] = await databaseClient.query<ResultSetHeader>(
      "insert into project (title,description) values(?,?)",
      [project.title, project.description],
    );
    if (result.affectedRows === 0) {
      throw new Error("insert failed");
    }
    return result.insertId;
  }
  async read(id: number): Promise<IProject | undefined> {
    const [rows] = await databaseClient.query<IProjectRow[]>(
      "select * from project where id=?",
      [id],
    );
    return rows[0];
  }
  async readAll(): Promise<IProject[]> {
    const [rows] = await databaseClient.query<IProjectRow[]>(
      "select * from project",
    );
    return rows;
  }

  async update(id: number, project: Partial<IProject>): Promise<boolean> {
    // tableau des données a modifier recu ex : ["title"]
    const columns = Object.keys(project);
    //   si c'est vide ba on fait rien
    if (columns.length === 0) return false;
    // on transforme ce qui est recu par un bon format pour la requete SQL ex : ["title" = ?] devient "title = ?, ..."
    const setColumns = columns.map((col) => `${col} = ?`).join(", ");
    // prepare les valeurs dans l ordre des ? suivi de l id du project
    const values = [...Object.values(project), id];

    //   dit : SQL prepare toi a midifier les valeurs de ces columns ex title
    //          avec ces valeurs (values)
    const [result] = await databaseClient.query<ResultSetHeader>(
      `update project set ${setColumns} where id = ?`,
      values,
    );

    return result.affectedRows > 0;
  }

  async delete(id: number): Promise<boolean> {
    const [result] = await databaseClient.query<ResultSetHeader>(
      "delete from project where id=?",
      [id],
    );

    return result.affectedRows > 0;
  }
}

export default new ProjectRepository();
