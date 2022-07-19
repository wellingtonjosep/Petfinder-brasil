import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import userListService from "../../../services/users/userList.service";

describe("List all users", () => {                      
    let connection: DataSource;
  
    beforeAll(async () => {
      await AppDataSource.initialize()
        .then((res) => (connection = res))
        .catch((err) => {
          console.error("Error during Data Source initialization", err);
        });
    });
  
    afterAll(async () => {
      await connection.destroy();
    });
  
    test("Should list all registered users", async () => { 
        const usersList = await userListService();

        expect(usersList).toHaveProperty("map");
    });
  });