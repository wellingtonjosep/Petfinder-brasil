import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import userUpdateService from "../../../services/users/userUpdate.service";
import app from "../../../app";
import request from "supertest";

describe("Teste para metodo PATCH em /users/:id", () => {
  let connection: DataSource;

  interface User {
    name: string;
    email: string;
    password?: string;
    contact: string;
  }

  let testUser1: User = {
    name: "Teste Kenzie",
    email: "teste@kenzie.com",
    password: "123456Ab!",
    contact: "teste@kenzie.com",
  };

  let testUser2: User = {
    name: "Teste2 Kenzie",
    email: "teste2@kenzie.com",
    password: "123456Ab!",
    contact: "teste2@kenzie.com",
  };

  let response1: any;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    response1 = await request(app).post("/users").send(testUser1);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Trying to update an user", async () => {
    const responsePatch = await request(app)
      .patch(`/users/${response1.body.id}`)
      .send(testUser2);

    const responseGet = await request(app).patch(`/users/${response1.body.id}`);
    expect(responsePatch.status).toEqual(200);

    expect(responseGet.body).toEqual(
      expect.objectContaining({
        id: responseGet.body.id,
        name: testUser2.name,
        email: testUser2.email,
        age: testUser2.contact,
        created_at: responseGet.body.created_at,
        updated_at: responseGet.body.updated_at,
      })
    );
  });

  test("Trying to update a user that doesn't exist", async () => {
    const response = await request(app).get(`/users/1`);

    expect(response.status).toEqual(404);
  });
});
