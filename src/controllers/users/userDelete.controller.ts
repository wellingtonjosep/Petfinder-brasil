import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import userDeleteService from "../../services/users/userDelete.service";

const userDeleteController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const response = await userDeleteService(id);

    return res.status(200).json({
      message: "User deleted",
    });
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default userDeleteController;
