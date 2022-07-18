import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import animalCreateService from "../../../services/animals/animalCreate.service";
import animalListService from "../../../services/animals/animalsList.service";
import { v4 as uuidv4 } from "uuid";
import { AppError } from "../../../errors/appError";
import app from "../../../app";
import request from "supertest";

const testAnimal = {
  name: "testName",
  breed: "testBreed",
  species: "testSpecies",
  description: "test description",
  image: "testImage",
  lastLocation: "testLastLocation",
  lastDate: "testLastDate",
  found: true,
  userId: uuidv4(),
};

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

  test("Should insert the information of new animal in the database", async () => {
    try {
      const response = await request(app).post("/animals").send(testAnimal);

      expect(response.status).toEqual(201);

      const newAnimal = await animalCreateService(
        testAnimal.name,
        testAnimal.breed,
        testAnimal.species,
        testAnimal.description,
        testAnimal.image,
        testAnimal.lastLocation,
        testAnimal.lastDate,
        testAnimal.found,
        testAnimal.userId
      );

      expect(newAnimal).toHaveProperty("created_at");
      expect(newAnimal).toHaveProperty("updated_at");
    } catch (error) {
      if (error instanceof AppError) {
        expect(error.message).toBe("user not exist");
      }
    }
  });
});
