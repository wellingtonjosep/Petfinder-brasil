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
const data_source_1 = require("../../data-source");
const users_entities_1 = require("../../entities/users.entities");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userCreateService = (name, email, password, contact) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(users_entities_1.User);
    const user = new users_entities_1.User();
    user.name = name;
    user.email = email;
    user.contact = contact;
    user.password = bcrypt_1.default.hashSync(password, 10);
    user.created_at = new Date();
    user.updated_at = new Date();
    userRepository.create(user);
    yield userRepository.save(user);
    return Object.assign(Object.assign({}, user), { password: undefined });
});
exports.default = userCreateService;
