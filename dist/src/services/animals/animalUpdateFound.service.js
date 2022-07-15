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
const appError_1 = require("../../errors/appError");
const animalUpdateFoundService = ({ id, found }) => __awaiter(void 0, void 0, void 0, function* () {
    const animalRepository = data_source_1.AppDataSource.getRepository(animals_entities_1.Animals);
    const animal = yield animalRepository.findOneBy({ id });
    if (!animal) {
        throw new appError_1.AppError(404, "Animal not found!");
    }
    const newAnimal = {
        found: true,
    };
    yield animalRepository.update(animal.id, Object.assign(Object.assign({}, newAnimal), { updated_at: new Date() }));
    return { message: `${animal.name} encontrou seu dono.` };
});
exports.default = animalUpdateFoundService;
