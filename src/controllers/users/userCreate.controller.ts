import userCreateService from "../../services/users/userCreate.service";
import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import { IUserCreate } from "../../interfaces/user";

const userCreateController = async (req: Request, res: Response) => {
  try {
    const { name, email, contact, isAdm, password }: IUserCreate = req.body;

    const response = await userCreateService({
      name,
      email,
      contact,
      isAdm,
      password,
    });

    return res.status(201).json(response);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default userCreateController;
