import supertest from "supertest";

import app from "../../src/app";

import databaseClient from "../../database/client";

import bcrypt from "bcryptjs";
import type { Result, Rows } from "../../database/client";

// boucle pour reset les mocks apres chaque test
afterEach(() => {
  jest.restoreAllMocks();
});

// test des GET
describe("GET /api/v1/users", () => {
  it("should fetch users", async () => {
    // qu'est ce que la base return dans le scenario d'un []
    const rows = [] as Rows;

    // Comment simuler la base de données

    // spyon intercepte la requete query de l {} databaclient
    // un espion qui va empecher l execution de la vrai req
    // et la remplacer

    // mockImplementation dit a la spyon quoi faire
    // sinon il continurait d aller consulter la vrai BDD
    jest.spyOn(databaseClient, "query").mockImplementation(async () => [rows, []]);

    // supertest initialise un server http
    // ce qui permet de tester sans reel connexion au server
    const res = await supertest(app).get("/api/v1/users");

    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual(rows);
  });
});

// test register / login user

describe("POST /api/register", () => {
  it("should return succeful http request", async () => {
    const hashedPassword = await bcrypt.hash("hach", 10);
    const user = [{ id: 1, email: "truc@test.fr", password: hashedPassword }] as Rows;

    jest.spyOn(databaseClient, "query").mockImplementation(async () => [user, []]);

    const res = await supertest(app).post("/api/v1/login").send({ email: "truc@test.fr", password: "hach" });

    expect(res.status).toBe(200);
  });

  it("should add a new user", async () => {
    // mock resultat renvoyer par la BDD
    const result = { insertId: 1 } as Result;
    // simulation BDD
    jest.spyOn(databaseClient, "query").mockImplementation(async () => [result, []]);

    // fake user
    const fakeUser = {
      name: "john",
      lastname: "doe",
      email: "johndoe@truc.fr",
      password: "hash",
    };
    // simuler req post
    const res = await supertest(app).post("/api/v1/register").send(fakeUser);

    // resultat attendu
    expect(res.status).toBe(201);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.insertId).toBe(result.insertId);
  });

  it("should fail on invalid user", async () => {
    const result = { insertId: 1 } as Result;
    // simulation BDD
    jest.spyOn(databaseClient, "query").mockImplementation(async () => [result, []]);

    // fake user
    const fakeUser = { name: "john" };
    // simuler req post
    const res = await supertest(app).post("/api/v1/register").send(fakeUser);

    // resultat attendu

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ message: "credentials invalid" });
  });
});
