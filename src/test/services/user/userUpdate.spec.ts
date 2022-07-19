import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import userUpdateService from "../../../services/users/userUpdate.service";
import app from "../../../app";
import request from "supertest";

const userAdm = {
  name: "Teste",
  email: "teste@kenzie.com",
  password: "123456",
  isAdm: true,
};

const loginAdm = {
  email: "teste@kenzie.com",
  password: "123456",
};

const userNotAdm = {
  name: "Teste2",
  email: "teste2@kenzie.com",
  password: "123456",
  isAdm: false,
};

const loginNotAdm = {
  email: "teste2@kenzie.com",
  password: "123456",
};
const updateNotAdm = {
  name: "Teste2 Kenzie ",
  email: "teste2@kenzie.com",
};

const updateAdm = {
  name: "Teste Kenzie",
  email: "teste@kenzie.com",
};

describe("Testing route PATCH /users/<uuid>", () => {
  it("Testing tokenless refresh", async () => {
    const login = await request(app).post("/login").send(loginNotAdm);
    const { token } = login.body;
    const user = await request(app)
      .get("/users/profile")
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .patch(`/users/${user.body.uuid}`)
      .send(updateNotAdm);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  it("Testing another user's update without admin permission", async () => {
    const signinNotAdm = await request(app).post("/login").send(loginNotAdm);
    const signinAdm = await request(app).post("/login").send(loginAdm);
    const tokenNotAdm = signinNotAdm.body.token;
    const tokenAdm = signinAdm.body.token;

    const adm = await request(app)
      .get("/users/profile")
      .set("Authorization", `Bearer ${tokenAdm}`);

    const response = await request(app)
      .patch(`/users/${adm.body.uuid}`)
      .send(updateAdm)
      .set("Authorization", `Bearer ${tokenNotAdm}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });
});
