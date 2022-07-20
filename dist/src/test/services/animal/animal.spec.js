"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../../../data-source");
const animalCreate_service_1 = __importDefault(require("../../../services/animals/animalCreate.service"));
const animalsList_service_1 = __importDefault(require("../../../services/animals/animalsList.service"));
const uuid_1 = require("uuid");
const appError_1 = require("../../../errors/appError");
const app_1 = __importDefault(require("../../../app"));
const supertest_1 = __importDefault(require("supertest"));
const testAnimal = {
    name: "testName",
    breed: "testBreed",
    species: "testSpecies",
    description: "test description",
    image: "testImage",
    lastLocation: "testLastLocation",
    lastDate: "testLastDate",
    found: true,
    userId: (0, uuid_1.v4)(),
};
describe("List all animals", () => {
    let connection;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.initialize()
            .then((res) => (connection = res))
            .catch((err) => {
            console.error("Error during Data Source initialization", err);
        });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    test("Should list all registered animals", () => __awaiter(void 0, void 0, void 0, function* () {
        const animalsList = yield (0, animalsList_service_1.default)();
        expect(animalsList).toHaveProperty("map");
    }));
    test("Should insert the information of new animal in the database", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, supertest_1.default)(app_1.default).post("/animals").send(testAnimal);
            expect(response.status).toEqual(201);
            const newAnimal = yield (0, animalCreate_service_1.default)(testAnimal.name, testAnimal.breed, testAnimal.species, testAnimal.description, testAnimal.image, testAnimal.lastLocation, testAnimal.lastDate, testAnimal.found, testAnimal.userId);
            expect(newAnimal).toHaveProperty("created_at");
            expect(newAnimal).toHaveProperty("updated_at");
        }
        catch (error) {
            if (error instanceof appError_1.AppError) {
                expect(error.message).toBe("user not exist");
            }
        }
    }));
});
