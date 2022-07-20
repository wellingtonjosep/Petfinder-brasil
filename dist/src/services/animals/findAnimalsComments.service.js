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
const comments_1 = require("../../entities/comments");
const appError_1 = require("../../errors/appError");
const findAnimalsCommentsService = (id, comments) => __awaiter(void 0, void 0, void 0, function* () {
    const animalRepository = data_source_1.AppDataSource.getRepository(animals_entities_1.Animals);
    const commentsRepository = data_source_1.AppDataSource.getRepository(comments_1.Comments);
    const animals = yield animalRepository.find();
    const animalExist = animals.find((element) => element.id === id);
    if (!animalExist) {
        throw new appError_1.AppError(404, "Animal not exist");
    }
    const comment = yield commentsRepository.findOne({
        where: {
            id: comments,
        },
    });
    if (!comment) {
        throw "not found comments";
    }
    const animal = yield animalRepository.findOne({
        where: {
            id: id,
        },
        relations: ["comments"],
    });
    if (!animal) {
        throw "not found comments";
    }
    const animalNameComments = [
        {
            name: animal.name,
            found: animal.found,
            comments: animal.comments,
        },
    ];
    return { animalNameComments };
});
exports.default = findAnimalsCommentsService;
