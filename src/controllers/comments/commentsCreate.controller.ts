import commentsCreateService from "../../services/comments/commentsCreate.service";
import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";

const commentsCreateController = async (req: Request, res: Response) => {
  try {
    const { comment, userId, animalsId } = req.body;

    const response = await commentsCreateService(comment, userId, animalsId);

    return res.status(201).json(response);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default commentsCreateController;
