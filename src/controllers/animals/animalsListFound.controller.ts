import { Request, Response } from "express";
import animalsFoundListService from "../../services/animals/animalsListFound.service";

const animalsFoundListController = async (req: Request, res: Response) => {
  try {
    const animals = await animalsFoundListService();

    return res.status(200).send(animals);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(401).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default animalsFoundListController;
