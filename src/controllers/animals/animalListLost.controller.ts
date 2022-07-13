import { Request, Response } from "express";
import animalLostListService from "../../services/animals/animalListLost.service";

const animalLostListController = async (req: Request, res: Response) => {
  try {
    const animals = await animalLostListService();

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

export default animalLostListController;
