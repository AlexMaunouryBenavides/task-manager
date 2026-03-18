import type { NextFunction, Request, Response } from "express";
import type ITask from "../interfaces/ITask";
import TaskRepository from "../models/taskRepository";

const browse = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const tasks = await TaskRepository.readAll();
      res.json(tasks);
   } catch (error) {
      next(error);
   }
};
const read = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const taskId = Number(req.params.id);
      const task = await TaskRepository.read(taskId);

      if (!task) {
         res.sendStatus(404);
         return;
      }
      res.json(task);
   } catch (error) {
      next(error);
   }
};
const edit = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const taskId = Number(req.params.id);
      const taskUpdated = req.body;
      const isUpadted = await TaskRepository.update(taskId, taskUpdated);
      if (!isUpadted) {
         res.status(404).json({ message: "update failed" });
         return;
      }
      res.sendStatus(204);
   } catch (error) {
      next(error);
   }
};
const add = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { title, description, project_id } = req.body;
      const newTask: Omit<
         ITask,
         "id" | "created_at" | "updated_at" | "status"
      > = { title, description, project_id: Number(project_id) };
      const insertId = await TaskRepository.create(newTask);
      res.status(201).json({ insertId });
   } catch (error) {
      next(error);
   }
};
const destroy = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const taskId = Number(req.params.id);
      const isDeleteGood = await TaskRepository.delete(taskId);
      if (!isDeleteGood) {
         res.status(404).json({ message: "task not found" });
         return;
      }
      res.sendStatus(204);
   } catch (error) {
      next(error);
   }
};

export default { browse, read, add, edit, destroy };
