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
    isAdm: true
  };

  const test1Login = {
    email: "test@email.com",
    password: "12345"
  }

  const test2Login = {
    email: "test2@email.com",
    password: "12345"
  }

  const ErroLogin = {
    email: "test@email.com",
    password: "123456"
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


  it("Validate email", async () => {
    const User = await request(app).post("/users").send(userTest2);
    const { id } = User.body

    await request(app).get(`/users/verify/${id}`)
  });


  it("Testing valid login", async () => {
    const response = await request(app).post("/users/login").send(test2Login)
  
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(typeof response.body.token).toBe("string");
  });


  it("Testing invalid login", async () => {
    const response = await request(app).post("/users/login").send(ErroLogin)
  
    expect(response.statusCode).toBe(401);
  });


  test("Testing user listing adm", async () => {
    const login = await request(app).post("/users/login").send(test2Login);
    const { token } = login.body

    const response = await request(app).get("/users").set("Authorization", `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
  });
});
