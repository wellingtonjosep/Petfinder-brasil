import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/users.entities";

const verifyIdUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = AppDataSource.getRepository(User);

  const userId = req.userId;

  const { id } = req.params;

  const user = await userRepository.findOneBy({ id });

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
};

export default verifyIdUserMiddleware;
