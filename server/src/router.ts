import express from "express";
import userController from "./modules/controllers/userController";

const route = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
// users
route.post("/api/v1/register", userController.add);
route.post("/api/v1/login", userController.login);

route.get("/api/v1/users", userController.browse);
// Define item-related routes

/* ************************************************************************* */

export default route;
