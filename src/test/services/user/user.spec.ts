import userCreateService from "../../../services/users/userCreate.service";
import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { IUser } from "../../../interfaces/user";
import { AppError } from "../../../errors/appError";
import userLoginService from "../../../services/users/userLogin.service";
import userListService from "../../../services/users/userList.service";

describe("Create an user", () => {
  let connection: DataSource;

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


  test("Should insert the information of new user in the database", async () => {
    const name = "test";
    const email = "test@email.com";
    const password = "12345";
    const contact = "9999-9999";

    const newUser = await userCreateService(name, email, contact, password);

    expect(newUser).toHaveProperty("id");
    expect(newUser.name).toBe("test");
    expect(newUser.email).toBe("test@email.com");
    expect(newUser.password).not.toBe("12345");
    expect(newUser).toHaveProperty("contact");
  });


  test("Testing user creation with already used email", async () => {
    try {
      const name = "test";
      const email = "test@email.com";
      const password = "12345";
      const contact = "9999-9999";

      const newUser = await userCreateService(name, email, contact, password);
    } catch (error) {
      if (error instanceof AppError) {
        expect(error.message).toBe("Email already exists");
      }
    }
  });


/*   test("Testing valid login", async () => {
    const email = "test@email.com";
    const password = "12345";

    const response = await userLoginService(email, password);

    expect(response).toBe(200);
    expect(response).toHaveProperty("token");
    expect(typeof response).toBe("string");
  }); */


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
  });
});