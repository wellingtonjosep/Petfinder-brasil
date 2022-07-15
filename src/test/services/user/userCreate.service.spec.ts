import userCreateService from "../../../services/users/userCreate.service";
import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";

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
    const name = "name";
    const email = "email@email.com";
    const contact = "";
    const password = "";

    const newUser = await userCreateService(name, email, contact, password);

    expect(newUser).toEqual(
      expect.objectContaining({
        id: 1,
        name,
        email,
        contact,
        password,
      })
    );
  });
});
