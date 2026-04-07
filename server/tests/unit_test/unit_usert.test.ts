import type { NextFunction, Request, Response } from "express";
import userController from "../../src/modules/controllers/userController";
import userRepository from "../../src/modules/models/userRepository";

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
    res = {
      json: jest.fn(),
    };
    // espionne la fonction next
    next = jest.fn();
  });

  it("should return users and status succes", async () => {
    // creation users
    const fakeUsers = [
      {
        id: 1,
        name: "toto",
      },
      {
        id: 2,
        name: "toti",
      },
    ];
    // ici je dit a jest
    // ne va pas en bdd mais utilise fakeUsers
    (userRepository.read as jest.Mock).mockResolvedValue(fakeUsers);

    // BDD --- repo --- CONTROLLER -- routes --- client

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
});
