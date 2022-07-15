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
const animalUpdate_service_1 = __importDefault(require("../../services/animals/animalUpdate.service"));
const updateAnimalController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { name, breed, species, description, image, lastLocation, lastDate, found, } = req.body;
        const user = yield (0, animalUpdate_service_1.default)({
            id,
            name,
            breed,
            species,
            description,
            image,
            lastLocation,
            lastDate,
            found,
        });
        return res.status(200).send(user);
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(401).send({
                error: err.name,
                message: err.message,
            });
        }
    }
});
exports.default = updateAnimalController;
