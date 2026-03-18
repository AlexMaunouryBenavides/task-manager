import type { ResultSetHeader, RowDataPacket } from "mysql2";
import databaseClient from "../../../database/client";
import type IUser from "../interfaces/IUser";
type IUserRow = IUser & RowDataPacket;

class UserRepository {
  async create(user: Omit<IUser, "id">): Promise<number> {
    const [result] = await databaseClient.query<ResultSetHeader>(
      "insert into user (name,lastname,email,password,role) VALUES (?,?,?,?,?)",
      [user.name, user.lastname ?? null, user.email, user.password, user.role],
    );
    if (result.affectedRows === 0) {
      throw new Error("Insert user failed");
    }
    return result.insertId;
  }

  async read(): Promise<IUser[]> {
    const [rows] = await databaseClient.query<IUserRow[]>("select * from user");
    return rows;
  }
  async readByMail(email: string): Promise<IUser | undefined> {
    const [rows] = await databaseClient.query<IUserRow[]>(
      "select * from user where email = ?",
      [email],
    );
    return rows[0];
  }

  async update(id: number, user: Partial<IUser>): Promise<boolean> {
    const columns = Object.keys(user);

    if (columns.length === 0) return false;

    //   prepare la structure pour la modif (etre sur que les valeurs correspondent au entré de la table)
    const setColumns = columns.map((col) => `${col} = ?`).join(", ");

    //   prepare tableau des valeurs a injecter
    const values = [...Object.values(user), id];

    const [result] = await databaseClient.query<ResultSetHeader>(
      `update user set ${setColumns} where id = ?`,
      values,
    );
    return result.affectedRows > 0;
  }
  async delete(id: number): Promise<boolean> {
    const [result] = await databaseClient.query<ResultSetHeader>(
      "delete from user where id = ?",
      [id],
    );

    return result.affectedRows > 0;
  }
}

export default new UserRepository();
