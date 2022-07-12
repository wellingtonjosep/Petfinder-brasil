import { Router } from "express";

import userCreateController from "../controllers/users/userCreate.controller";
import userListController from "../controllers/users/userList.controller";
import userLoginController from "../controllers/users/userLogin.controller";
import userUpdateController from "../controllers/users/userUpdate.controller";

import verifyFieldsMiddleware from "../middlewares/verifyFields.middleware";
import verifyIdUserMiddleware from "../middlewares/verifyIdUser.middleware";
import verifyTokenMiddleware from "../middlewares/verifyToken.middleware";

const router = Router();

router.get("/users", userListController);
router.post("/users", verifyFieldsMiddleware, userCreateController);
router.post("/users/login", userLoginController);
router.patch("/users/:id", verifyTokenMiddleware, verifyIdUserMiddleware, userUpdateController);

export default router;
