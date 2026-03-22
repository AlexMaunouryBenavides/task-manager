import express from "express";
import auth from "./middlewares/auth";
import projectController from "./modules/controllers/projectController";
import taskController from "./modules/controllers/taskController";
import userController from "./modules/controllers/userController";
import { UserRole } from "./modules/interfaces/IUser";

const route = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
// Users
route.post("/api/v1/register", userController.add);
route.post("/api/v1/login", userController.login);
route.get("/api/v1/users", userController.browse);
// , auth.verifyToken, auth.verifyRole([UserRole.ADMIN])
route.get("/api/v1/me", auth.verifyToken, userController.readCurrentUser);
// Projects
route.get("/api/v1/projects", auth.verifyToken, auth.verifyRole([UserRole.ADMIN, UserRole.COLLABORATOR]), projectController.browse);
route.get("/api/v1/projects/:id", auth.verifyToken, auth.verifyRole([UserRole.ADMIN, UserRole.COLLABORATOR]), projectController.read);

route.post("/api/v1/projects", auth.verifyToken, auth.verifyRole([UserRole.ADMIN]), projectController.add);
route.patch("/api/v1/projects/:id", auth.verifyToken, auth.verifyRole([UserRole.ADMIN]), projectController.edit);
route.delete("/api/v1/projects/:id", auth.verifyToken, auth.verifyRole([UserRole.ADMIN]), projectController.destroy);

// Tasks
route.get("/api/v1/tasks", auth.verifyToken, auth.verifyRole([UserRole.ADMIN, UserRole.COLLABORATOR]), taskController.browse);
route.get("/api/v1/tasks/:id", auth.verifyToken, auth.verifyRole([UserRole.ADMIN, UserRole.COLLABORATOR]), taskController.read);

route.post("/api/v1/tasks", auth.verifyToken, auth.verifyRole([UserRole.ADMIN, UserRole.COLLABORATOR]), taskController.add);
route.patch("/api/v1/tasks/:id", auth.verifyToken, auth.verifyRole([UserRole.ADMIN, UserRole.COLLABORATOR]), taskController.edit);
route.delete("/api/v1/tasks/:id", auth.verifyToken, auth.verifyRole([UserRole.ADMIN, UserRole.COLLABORATOR]), taskController.destroy);

/* ************************************************************************* */

export default route;
