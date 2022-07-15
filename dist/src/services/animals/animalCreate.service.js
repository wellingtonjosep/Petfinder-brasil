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
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../../data-source");
const animals_entities_1 = require("../../entities/animals.entities");
const users_entities_1 = require("../../entities/users.entities");
const appError_1 = require("../../errors/appError");
const animalCreateService = (name, breed, species, description, image, lastLocation, lastDate, found, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const animalsRepository = data_source_1.AppDataSource.getRepository(animals_entities_1.Animals);
    const userRepository = data_source_1.AppDataSource.getRepository(users_entities_1.User);
    const user = yield userRepository.findOne({
        where: {
            id: userId,
        },
    });
    if (!user) {
        throw new appError_1.AppError(404, "user not exist");
    }
    const animal = animalsRepository.create({
        name,
        breed,
        species,
        description,
        image,
        lastLocation,
        lastDate,
        found,
        user,
        created_at: new Date(),
        updated_at: new Date(),
    });
    yield animalsRepository.save(animal);
    return Object.assign(Object.assign({}, animal), { user: animal.user.id });
});
exports.default = animalCreateService;
