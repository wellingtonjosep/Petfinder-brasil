import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import findAnimalsCommentsService from "../../services/comments/findAnimalsComments.service";

const findAnimalsCommentsController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const findAnimalsComments = await findAnimalsCommentsService(id);

    return res.json(findAnimalsComments);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default findAnimalsCommentsController;
