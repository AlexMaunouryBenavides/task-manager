import supertest from "supertest";
import databaclient from "../../database/client";
import app from "../../src/app";
import type { Result, Rows } from "../../database/client";

// nettoie
afterEach(() => {
  jest.resetAllMocks();
});

describe("GET /api/v1/tasks", () => {
  it("should fetch tasks", async () => {
    // prepare
    const rows = [] as Rows;
    jest.spyOn(databaclient, "query").mockImplementation(async () => [rows, []]);

    // execute
    const res = await supertest(app).get("/api/v1/tasks");

    // verifie
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual(rows);
  });
});
