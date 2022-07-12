import animalCreateService from "../../services/animals/animalCreate.service";
import { Request, Response } from "express";
const animalCreateController = async (req: Request, res: Response) => {
  try {
    const {
      name,
      breed,
      species,
      description,
      image,
      lastLocation,
      lastDate,
      found,
      userId
    } = req.body;

    const response = await animalCreateService(
      name,
      breed,
      species,
      description,
      image,
      lastLocation,
      lastDate,
      found,
      userId
    );

    return res.status(201).json(response);
  } catch (err) {
    if (err instanceof Error) {
      return;
    }
  }
};

export default animalCreateController;
