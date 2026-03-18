import express from "express";
import auth from "./middlewares/auth";
import projectController from "./modules/controllers/projectController";
import userController from "./modules/controllers/userController";
import { UserRole } from "./modules/interfaces/IUser";

const route = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
// Users
route.post("/api/v1/register", userController.add);
route.post("/api/v1/login", userController.login);
route.get(
  "/api/v1/users",
  auth.verifyToken,
  auth.verifyRole([UserRole.ADMIN]),
  userController.browse,
);
// Projects
route.get("/api/v1/projects", projectController.browse);
route.get("/api/v1/projects/:id", projectController.read);

route.post("/api/v1/projects", projectController.add);
route.patch("/api/v1/projects/:id", projectController.edit);
route.delete("/api/v1/projects/:id", projectController.destroy);

/* ************************************************************************* */

export default route;
