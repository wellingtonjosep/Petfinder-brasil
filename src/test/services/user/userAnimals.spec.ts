import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import { AppDataSource } from "../../../data-source";
import { AppError } from "../../../errors/appError";
import userAnimalsService from "../../../services/users/userAnimals.service";

const testUser = {
    name: "test",
    email: "test@email.com",
    contact: "9999-9999",
    isAdm: false,
    password: "12345"
}

describe("List an user's animals", () => {
    let connection: DataSource
  
    beforeAll(async () => {
      await AppDataSource.initialize()
        .then((res) => (connection = res))
        .catch((err) => {
          console.error("Error during DataSource initialization", err)
        })
    })
  
    afterAll(async () => {
      await connection.destroy()
    })
  
  
    test("Should be able to list an user's animals", async () => {
        try {

            const response = await request(app).post("/users").send(testUser);
            const { id } = response.body
            
            const userAnimals = await userAnimalsService(id)
      
            expect(userAnimals).toHaveProperty("map");

          } catch (error) {
            if (error instanceof AppError) {
              expect(error.message).toBe("user not exist");
            }
          }
    })
})