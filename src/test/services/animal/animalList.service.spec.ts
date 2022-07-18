import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import animalListService from "../../../services/animals/animalsList.service";

describe("List all animals", () => {                      
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
  
    test("Should list all registered animals", async () => { 
        const animalsList = await animalListService();

        expect(animalsList).toHaveProperty("map");
    });
  });