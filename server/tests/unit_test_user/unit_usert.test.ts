import type { Response, Request, NextFunction } from "express";
import userRepository from "../../src/modules/models/userRepository";
import userController from "../../src/modules/controllers/userController";

// test que si le repo envoie des données
// le controller fait ce que je lui demande
// donc j'ai besoin du repo,de ma methode a tester dans le controller
// et le contenu du test

// remplace le repo par un objet qu'on peut espionner
jest.mock("../../src/modules/models/userRepository");

describe("user controller", () => {
   let req: Partial<Request>;
   let res: Partial<Response>;
   let next: NextFunction;

   beforeEach(() => {
      req = {};
      // espionne la fonction .json
      res = { json: jest.fn() };
      // espionne la fonction next
      next = jest.fn();
   });

   it("should return users and status succes", async () => {
      // creation users
      const fakeUsers = [
         { id: 1, name: "toto" },
         { id: 2, name: "toti" },
      ];
      // ici je dit a jest
      // ne va pas en bdd mais utilise fakeUsers
      (userRepository.read as jest.Mock).mockResolvedValue(fakeUsers);

      // j execute le code du controller
      await userController.browse(req as Request, res as Response, next);

      // verifie que le controller a appeler l apli UNE SEUL fois
      expect(userRepository.read).toHaveBeenCalledTimes(1);
      // on verifie que les donnée envoyer du repo espionné sont celle
      // de fakeUsers
      expect(res.json).toHaveBeenCalledWith(fakeUsers);
      // on verifie de next n'a pas ete call
      // sinon c'est que je passe a l erreur
      expect(next).not.toHaveBeenCalled();
   });

   it("should create a user", async () => {
      const newUser = {
         name: "truc",
         lastname: "machin",
         email: "trucmachin@aze.fr",
         password: "hash",
         role: "admin",
      };
      req.body = newUser;

      (userRepository.create as jest.Mock).mockResolvedValue(1);

      res.status = jest.fn().mockReturnThis();

      await userController.add(
         req as Request,
         res as Response,
         next as NextFunction,
      );

      expect(userRepository.create).toHaveBeenCalledWith({
         name: "truc",
         lastname: "machin",
         email: "trucmachin@aze.fr",
         //  ici je suis obliger de faire ça car le hash du mdp change tout le temps
         // donc je demande juste une string
         password: expect.any(String),
         role: "admin",
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ insertId: 1 });
   });
   it("should login a user if mail is correct", async () => {
      // les element du body
      // email et password pour se login
      const login = { email: "trucmachin@jest.fr", password: "mdp" };
      req.body = login;

      const userFromDb = {
         id: 1,
         email: "trucmachin@jest.fr",
         password: "hashed",
      };

      // la requete au repo
      (userRepository.readByMail as jest.Mock).mockResolvedValue(userFromDb);
      // execute code du controller
      await userController.login(
         req as Request,
         res as Response,
         next as NextFunction,
      );

      // les expect
      expect(userRepository.readByMail).toHaveBeenCalledWith(login.email);
   });
});
