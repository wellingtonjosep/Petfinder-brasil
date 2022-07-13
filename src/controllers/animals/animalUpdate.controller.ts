import { Request, Response } from "express";
import { IAnimals } from "../../interfaces/animals";
import animalUpdateService from "../../services/animals/animalUpdate.service";

const updateAnimalController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const {
      name,
      breed,
      species,
      description,
      image,
      lastLocation,
      lastDate,
      found,
    }: IAnimals = req.body;

    const user = await animalUpdateService({
      id,
      name,
      breed,
      species,
      description,
      image,
      lastLocation,
      lastDate,
      found,
    });

    return res.status(200).send(user);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(401).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default updateAnimalController;
