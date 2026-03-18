import type { NextFunction, Request, Response } from "express";
import type IProject from "../interfaces/IProject";
import ProjectRepository from "../models/projectRepository";

const browse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projects = await ProjectRepository.readAll();
    res.json(projects);
  } catch (error) {
    next(error);
  }
};
const read = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projectId = Number(req.params.id);
    const project = await ProjectRepository.read(projectId);

    if (!project) {
      res.sendStatus(404);
      return;
    }

    res.json(project);
  } catch (error) {
    next(error);
  }
};

const edit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projectId = Number(req.params.id);
    const projectUpdates = req.body;
    const isUpdated = await ProjectRepository.update(projectId, projectUpdates);
    if (!isUpdated) {
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
    const { title, description } = req.body;
    const newProject: Omit<IProject, "id" | "created_at" | "updated_at"> = {
      title,
      description,
    };
    const insertId = await ProjectRepository.create(newProject);
    res.status(201).json({ insertId });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projectId = Number(req.params.id);
    const isDeleteGood = await ProjectRepository.delete(projectId);
    if (!isDeleteGood) {
      res.status(404).json({ message: "project not found" });
      return;
    }
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default { browse, read, edit, add, destroy };
