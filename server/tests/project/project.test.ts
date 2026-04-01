import supertest from "supertest";
import databaclient from "../../database/client";
import app from "../../src/app";

import type { Result, Rows } from "../../database/client";

afterEach(() => {
  jest.resetAllMocks();
});

describe("GET /api/v1/projects", () => {
  it("should fetch projects", async () => {
    const rows = [] as Rows;

    jest
      .spyOn(databaclient, "query")
      .mockImplementation(async () => [rows, []]);

    const res = await supertest(app).get("/api/v1/projects");

    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual(rows);
  });
});
describe("POST /api/v1/projects", () => {
  test("should add new project ", async () => {
    const result = { insertId: 1 } as Result;

    jest
      .spyOn(databaclient, "query")
      .mockImplementation(async () => [result, []]);

    const fakeProject = { title: "foo" };

    const res = await supertest(app).post("/api/v1/projects").send(fakeProject);

    expect(res.status).toBe(201);
    expect(res.body).toBeInstanceOf(Object);
  });
});

describe("patch /api/v1/projects", () => {
  test("should update an existing project ", async () => {
    const result = { affectedRows: 1 } as Result;

    jest
      .spyOn(databaclient, "query")
      .mockImplementation(async () => [result, []]);

    const fakeProject = { title: "foo" };

    const res = await supertest(app)
      .patch("/api/v1/projects/1")
      .send(fakeProject);

    expect(res.status).toBe(204);
    expect(res.body).toEqual({});
  });
});

describe("delete /api/v1/projects", () => {
  test("should delete an existing project ", async () => {
    const result = { affectedRows: 1 } as Result;

    jest
      .spyOn(databaclient, "query")
      .mockImplementation(async () => [result, []]);

    const res = await supertest(app).delete("/api/v1/projects/1");

    expect(res.status).toBe(204);
    expect(res.body).toEqual({});
  });
});
