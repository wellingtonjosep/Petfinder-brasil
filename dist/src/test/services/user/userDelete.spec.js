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
const app_1 = __importDefault(require("../../../app"));
const supertest_1 = __importDefault(require("supertest"));
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
    it("Testing tokenless deletion", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = yield (0, supertest_1.default)(app_1.default).post("/login").send(loginAdm);
        const { token } = login.body;
        const user = yield (0, supertest_1.default)(app_1.default)
            .get("/users/profile")
            .set("Authorization", `Bearer ${token}`);
        const response = yield (0, supertest_1.default)(app_1.default).delete(`/users/${user.body.uuid}`);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message", "Invalid Token");
    }));
    it("Testing Deleting Another User Without ADM Permission", () => __awaiter(void 0, void 0, void 0, function* () {
        const signinNotAdm = yield (0, supertest_1.default)(app_1.default).post("/login").send(loginNotAdm);
        const signinAdm = yield (0, supertest_1.default)(app_1.default).post("/login").send(loginAdm);
        const tokenNotAdm = signinNotAdm.body.token;
        const tokenAdm = signinAdm.body.token;
        const adm = yield (0, supertest_1.default)(app_1.default)
            .get("/users/profile")
            .set("Authorization", `Bearer ${tokenAdm}`);
        const response = yield (0, supertest_1.default)(app_1.default)
            .delete(`/users/${adm.body.uuid}`)
            .set("Authorization", `Bearer ${tokenNotAdm}`);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message", "Invalid Token");
    }));
    it("Testing Deleting Another User with ADM Permission", () => __awaiter(void 0, void 0, void 0, function* () {
        const signinNotAdm = yield (0, supertest_1.default)(app_1.default).post("/login").send(loginNotAdm);
        const signinAdm = yield (0, supertest_1.default)(app_1.default).post("/login").send(loginAdm);
        const tokenNotAdm = signinNotAdm.body.token;
        const tokenAdm = signinAdm.body.token;
        const notAdm = yield (0, supertest_1.default)(app_1.default)
            .get("/users/profile")
            .set("Authorization", `Bearer ${tokenNotAdm}`);
        const response = yield (0, supertest_1.default)(app_1.default)
            .delete(`/users/${notAdm.body.uuid}`)
            .set("Authorization", `Bearer ${tokenAdm}`);
        expect(response.body).toHaveProperty("message", "Invalid Token");
    }));
});
