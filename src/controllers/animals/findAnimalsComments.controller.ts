import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import findAnimalsCommentsService from "../../services/animals/findAnimalsComments.service";

const findAnimalsCommentsController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { comments } = req.body;
    const findAnimalsComments = await findAnimalsCommentsService(id, comments);

    return res.json(findAnimalsComments);
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default findAnimalsCommentsController;
