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
const appError_1 = require("../../errors/appError");
const comments_1 = require("../../entities/comments");
const users_entities_1 = require("../../entities/users.entities");
const animals_entities_1 = require("../../entities/animals.entities");
const commentsCreateService = (comment, userId, animalsId) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(users_entities_1.User);
    const animalsRepository = data_source_1.AppDataSource.getRepository(animals_entities_1.Animals);
    const commentsRepository = data_source_1.AppDataSource.getRepository(comments_1.Comments);
    const users = yield userRepository.find();
    const user = users.find((element) => element.id === userId);
    const animals = yield animalsRepository.find();
    const animal = animals.find((element) => element.id === animalsId);
    if (!user || !animal) {
        throw new appError_1.AppError(404, "user or animals not exist");
    }
    const newComment = commentsRepository.create({
        user,
        animal,
        comment,
        userName: user.name,
        created_at: new Date(),
        id: undefined,
    });
    yield commentsRepository.save(newComment);
    if (animal.comments) {
        yield animalsRepository.save(Object.assign(Object.assign({}, animal), { comments: [...animal.comments, newComment] }));
    }
    else {
        yield animalsRepository.save(Object.assign(Object.assign({}, animal), { comments: [newComment] }), {});
    }
    const { animal: animalReturn } = newComment;
    const { comments } = animalReturn; //retorna todos comentários do animal
    return Object.assign(Object.assign({}, newComment), { user: undefined, animal: undefined, id: undefined });
});
exports.default = commentsCreateService;
