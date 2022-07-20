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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../../app"));
const data_source_1 = require("../../../data-source");
const appError_1 = require("../../../errors/appError");
const userAnimals_service_1 = __importDefault(require("../../../services/users/userAnimals.service"));
const testUser = {
    name: "test",
    email: "test@email.com",
    contact: "9999-9999",
    isAdm: false,
    password: "12345"
};
describe("List an user's animals", () => {
    let connection;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.initialize()
            .then((res) => (connection = res))
            .catch((err) => {
            console.error("Error during DataSource initialization", err);
        });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    test("Should be able to list an user's animals", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, supertest_1.default)(app_1.default).post("/users").send(testUser);
            const { id } = response.body;
            const userAnimals = yield (0, userAnimals_service_1.default)(id);
            expect(userAnimals).toHaveProperty("map");
        }
        catch (error) {
            if (error instanceof appError_1.AppError) {
                expect(error.message).toBe("user not exist");
            }
        }
    }));
});
