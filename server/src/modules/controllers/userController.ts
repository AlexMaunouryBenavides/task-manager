import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import type { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import type IUser from "../interfaces/IUser";
import { UserRole } from "../interfaces/IUser";
import UserRepository from "../models/userRepository";
dotenv.config();

const browse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await UserRepository.read();
    res.json(users);
  } catch (error) {
    next(error);
  }
};
const readCurrentUser: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user;
    console.log("req", req);
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const user = await UserRepository.readOne(userId.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json({
      id: user.id,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    next(error);
  }
};
const add = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, lastname, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: Omit<IUser, "id"> = {
      name,
      lastname: lastname ?? null,
      email,
      password: hashedPassword,
      role: (role as UserRole) ?? UserRole.COLLABORATOR,
    };
    const insertId = await UserRepository.create(newUser);
    res.status(201).json({ insertId });
  } catch (error) {
    next(error);
  }
};
const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // recup donner du client
    const { email, password } = req.body;
    // verifier si email existe
    const user = await UserRepository.readByMail(email);
    if (!user) {
      res.status(401).json({ message: "invalide credentials" });
      return;
    }
    // verifier si password sont identique
    const IsPasswordValid = await bcrypt.compare(password, user.password);
    if (!IsPasswordValid) {
      res.status(401).json({ message: "invalide credentials" });
      return;
    }
    // creer jwt et envoyer via cookies
    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = jwt.sign(payload, process.env.APP_SECRET as string, {
      expiresIn: "1h",
    });
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 3600000,
    });
    res.status(200).json({ message: "connexion succes" });
    return;
  } catch (error) {
    next(error);
  }
};

export default { browse, add, login, readCurrentUser };
