import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/users.entities";

const verifyEmailMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find()

  const { email } = req.body

  const emailExists = users.find((element) => element.email === email)

  if (emailExists) {
    return res.status(401).json({
        message: "Email already exists"
    })
  }

  next();
};

export default verifyEmailMiddleware;