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
const appError_1 = require("../../../errors/appError");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../../app"));
describe("Create an user", () => {
    let connection;
    const userTest1 = {
        name: "test",
        email: "test@email.com",
        password: "12345",
        contact: "9999-9999",
        isAdm: true
    };
    const userTest2 = {
        name: "test 2",
        email: "test2@email.com",
        password: "12345",
        contact: "9999-9999",
        isAdm: true
    };
    const test1Login = {
        email: "test@email.com",
        password: "12345"
    };
    const test2Login = {
        email: "test2@email.com",
        password: "12345"
    };
    const ErroLogin = {
        email: "test@email.com",
        password: "123456"
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.initialize()
            .then((res) => (connection = res))
            .catch((err) => {
            console.error("Error during DataSource initialization", err);
        });
    })); //criar conexao com banco
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy(); //fechar conexão com banco de
    }));
    it("Should insert the information of new user in the database", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/users").send(userTest1);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("email");
        expect(response.body).toHaveProperty("created_at");
        expect(response.body).toHaveProperty("updated_at");
        expect(response.body).toHaveProperty("isAdm");
        expect(response.body).not.toHaveProperty("password");
    }));
    it("Testing user creation with already used email", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield (0, supertest_1.default)(app_1.default).post("/users").send(userTest1);
            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty("Email already exists");
        }
        catch (error) {
            if (error instanceof appError_1.AppError) {
                expect(error.message).toBe("Wrong email/password");
                expect(error.statusCode).toBe(401);
            }
        }
    }));
    it("Validate email", () => __awaiter(void 0, void 0, void 0, function* () {
        const User = yield (0, supertest_1.default)(app_1.default).post("/users").send(userTest2);
        const { id } = User.body;
        yield (0, supertest_1.default)(app_1.default).get(`/users/verify/${id}`);
    }));
    it("Testing valid login", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/users/login").send(test2Login);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");
        expect(typeof response.body.token).toBe("string");
    }));
    it("Testing invalid login", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/users/login").send(ErroLogin);
        expect(response.statusCode).toBe(401);
    }));
    test("Testing user listing adm", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(app_1.default).post("/users/login").send(test2Login);
        const { token } = login.body;
        const response = yield (0, supertest_1.default)(app_1.default).get("/users").set("Authorization", `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
    }));
});
