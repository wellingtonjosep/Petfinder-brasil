import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/users.entities";

const confirmEmailMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  const verified = users.find((user) => user.email_confirm === true);

  if (!verified) {
    return res.status(401).json({ message: "email not verified" });
  }
  next();
};

export default confirmEmailMiddleware;
