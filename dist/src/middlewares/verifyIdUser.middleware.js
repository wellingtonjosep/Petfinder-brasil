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
const data_source_1 = require("../data-source");
const users_entities_1 = require("../entities/users.entities");
const verifyIdUserMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(users_entities_1.User);
    const userId = req.userId;
    const { id } = req.params;
    const user = yield userRepository.findOneBy({ id });
    if (!user) {
        return res.status(404).json({
            message: "User not found",
        });
    }
    if (id !== userId) {
        return res.status(401).json({
            message: "you cannot update a user other than you",
        });
    }
    next();
});
exports.default = verifyIdUserMiddleware;
