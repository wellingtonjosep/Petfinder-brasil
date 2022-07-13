import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";
import animalListService from "../../services/animals/animalsList.service";

const animalListController = async (req: Request, res: Response) => {
  try {
    const response = await animalListService();

    return res.status(200).json({
      animal: response,
    });
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};
export default animalListController;
