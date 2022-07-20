import userCreateService from "../../../services/users/userCreate.service";
import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { IUser } from "../../../interfaces/user";
import { AppError } from "../../../errors/appError";
import userLoginService from "../../../services/users/userLogin.service";
import userListService from "../../../services/users/userList.service";

import request from "supertest";
import app from "../../../app";

describe("Create an user", () => {
  let connection: DataSource;

  const userTest1 = {
    name: "test",
    email: "test@email.com",
    password: "12345",
    contact: "9999-9999",
    isAdm: true
  };

  const userTest2 = {
    name: "test 2",
    email: "test2@email.com",
    password: "12345",
    contact: "9999-9999",
    isAdm: false
  };

  const test1Login = {
    email: "test@email.com",
    password: "12345"
  }

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during DataSource initialization", err);
      });
  }); //criar conexao com banco

  afterAll(async () => {
    await connection.destroy(); //fechar conexão com banco de
  });

  it("Should insert the information of new user in the database", async () => {
    const response = await request(app).post("/users").send(userTest1);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("created_at");
    expect(response.body).toHaveProperty("updated_at");
    expect(response.body).toHaveProperty("isAdm");
    expect(response.body).not.toHaveProperty("password");
  });


  it("Testing user creation with already used email", async () => {
    try {
      const response = await request(app).post("/users").send(userTest1);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("Email already exists");

    } catch (error) {
      if (error instanceof AppError) {
        expect(error.message).toBe("Wrong email/password");
        expect(error.statusCode).toBe(401);
      }
    }
  });

  it("Testing valid login", async () => {
    const newUser = await request(app).post("/users").send(userTest1);
    const { id } = newUser.body.id

    const response = await request(app).get(`/users/verify/${id}`).send(test1Login);
    console.log('response', response.body)

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(typeof response.body.token).toBe("string");
  });


  it("Testing valid login", async () => {
    const response = await request(app).post("/users/login").send(test1Login);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(typeof response.body.token).toBe("string");
  });


  /* test("Testing valid login", async () => {
    const email = "test@email.com";
    const password = "12345";

    const response = await userLoginService(email, password);

    expect(response).toBe(200);
    expect(response).toHaveProperty("token");
    expect(typeof response).toBe("string");
  });


  test("Testing invalid login email", async () => {
    try {
      const email = "test5@email.com.br";
      const password = "12345";

      const responseLogin = await userLoginService(email, password);
    } catch (error) {
      if (error instanceof AppError) {
        expect(error.message).toBe("Wrong email/password");
        expect(error.statusCode).toBe(401);
      }
    }
  });


  test("Testing invalid login password", async () => {
    try {
      const email = "test@email.com";
      const password = "123";

      const responseLogin = await userLoginService(email, password);
    } catch (error) {
      if (error instanceof AppError) {
        expect(error.message).toBe("Wrong email/password");
        expect(error.statusCode).toBe(401);
      }
    }
  });


  test("Testing user listing", async () => {
    const response = await userListService()

    expect(response).toHaveLength(2)
  }); */
});
