import userConfirm from "../../services/users/userConfirmEmail.service";
import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import { IUserConfirm, IUserUpdate } from "../../interfaces/user";

const userConfirmController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email_confirm }: IUserConfirm = req.body;

    const response = await userConfirm({ id, email_confirm });

    return res.status(200).json(response);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default userConfirmController;
