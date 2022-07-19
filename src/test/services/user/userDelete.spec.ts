import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import userUpdateService from "../../../services/users/userUpdate.service";
import app from "../../../app";
import request from "supertest";

const userAdm = {
  name: "daniel",
  email: "daniel@kenzie.com",
  password: "123456",
  isAdm: true,
};

const loginAdm = {
  email: "daniel@kenzie.com",
  password: "123456",
};

const userNotAdm = {
  name: "ugo",
  email: "ugo@kenzie.com",
  password: "123456",
  isAdm: false,
};

const loginNotAdm = {
  email: "ugo@kenzie.com",
  password: "123456",
};

describe("Testing routeDELETE /users/<uuid>", () => {
  it("Testing tokenless deletion", async () => {
    const login = await request(app).post("/login").send(loginAdm);
    const { token } = login.body;
    const user = await request(app)
      .get("/users/profile")
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app).delete(`/users/${user.body.uuid}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  it("Testing Deleting Another User Without ADM Permission", async () => {
    const signinNotAdm = await request(app).post("/login").send(loginNotAdm);
    const signinAdm = await request(app).post("/login").send(loginAdm);
    const tokenNotAdm = signinNotAdm.body.token;
    const tokenAdm = signinAdm.body.token;

    const adm = await request(app)
      .get("/users/profile")
      .set("Authorization", `Bearer ${tokenAdm}`);

    const response = await request(app)
      .delete(`/users/${adm.body.uuid}`)
      .set("Authorization", `Bearer ${tokenNotAdm}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  it("Testing Deleting Another User with ADM Permission", async () => {
    const signinNotAdm = await request(app).post("/login").send(loginNotAdm);
    const signinAdm = await request(app).post("/login").send(loginAdm);
    const tokenNotAdm = signinNotAdm.body.token;
    const tokenAdm = signinAdm.body.token;

    const notAdm = await request(app)
      .get("/users/profile")
      .set("Authorization", `Bearer ${tokenNotAdm}`);

    const response = await request(app)
      .delete(`/users/${notAdm.body.uuid}`)
      .set("Authorization", `Bearer ${tokenAdm}`);

    expect(response.body).toHaveProperty("message", "Invalid Token");
  });
});
