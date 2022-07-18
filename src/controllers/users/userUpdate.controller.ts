import userUpdateService from "../../services/users/userUpdate.service";
import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import { IUserUpdate } from "../../interfaces/user";

const userUpdateController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { name, email, password, contact }: IUserUpdate = req.body;

    const response = await userUpdateService({
      id,
      name,
      email,
      password,
      contact,
    });

    return res.status(200).json(response);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default userUpdateController;
