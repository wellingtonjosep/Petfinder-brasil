"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userCreate_controller_1 = __importDefault(require("../controllers/users/userCreate.controller"));
const userDelete_controller_1 = __importDefault(require("../controllers/users/userDelete.controller"));
const userList_controller_1 = __importDefault(require("../controllers/users/userList.controller"));
const userLogin_controller_1 = __importDefault(require("../controllers/users/userLogin.controller"));
const userUpdate_controller_1 = __importDefault(require("../controllers/users/userUpdate.controller"));
const verifyEmail_middleware_1 = __importDefault(require("../middlewares/verifyEmail.middleware"));
const animalCreate_controller_1 = __importDefault(require("../controllers/animals/animalCreate.controller"));
const animalList_controller_1 = __importDefault(require("../controllers/animals/animalList.controller"));
const animalListLost_controller_1 = __importDefault(require("../controllers/animals/animalListLost.controller"));
const animalUpdate_controller_1 = __importDefault(require("../controllers/animals/animalUpdate.controller"));
const animalsListFound_controller_1 = __importDefault(require("../controllers/animals/animalsListFound.controller"));
const userAnimals_controller_1 = __importDefault(require("../controllers/users/userAnimals.controller"));
const commentsCreate_controller_1 = __importDefault(require("../controllers/comments/commentsCreate.controller"));
const findAnimalsComments_controller_1 = __importDefault(require("../controllers/animals/findAnimalsComments.controller"));
const verifyFields_middleware_1 = __importDefault(require("../middlewares/verifyFields.middleware"));
const verifyFieldsAnimalsCreate_middleware_1 = __importDefault(require("../middlewares/verifyFieldsAnimalsCreate.middleware"));
const verifyIdUser_middleware_1 = __importDefault(require("../middlewares/verifyIdUser.middleware"));
const verifyToken_middleware_1 = __importDefault(require("../middlewares/verifyToken.middleware"));
const animalUpdateFound_controller_1 = __importDefault(require("../controllers/animals/animalUpdateFound.controller"));
const router = (0, express_1.Router)();
//USUÁRIO
router.get("/users", userList_controller_1.default);
router.get("/users/animals/:id", userAnimals_controller_1.default);
router.post("/users", verifyFields_middleware_1.default, verifyEmail_middleware_1.default, userCreate_controller_1.default);
router.post("/users/login", userLogin_controller_1.default);
router.patch("/users/:id", verifyToken_middleware_1.default, verifyIdUser_middleware_1.default, verifyEmail_middleware_1.default, userUpdate_controller_1.default);
router.delete("/users/:id", verifyToken_middleware_1.default, verifyIdUser_middleware_1.default, userDelete_controller_1.default);
//ANIMAIS
router.get("/animals", animalList_controller_1.default);
router.post("/animals", verifyFieldsAnimalsCreate_middleware_1.default, animalCreate_controller_1.default);
router.patch("/animals/:id", animalUpdate_controller_1.default);
router.get("/animals/lost", animalListLost_controller_1.default);
router.get("/animals/found", animalsListFound_controller_1.default);
//COMENTÁRIOS
router.get("/animals/comments/:id", findAnimalsComments_controller_1.default);
router.patch("/animals/found/:id", animalUpdateFound_controller_1.default);
router.post("/comments", verifyToken_middleware_1.default, commentsCreate_controller_1.default);
exports.default = router;
