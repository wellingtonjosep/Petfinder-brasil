import { Request, Response } from "express";
import { IAnimalsFound } from "../../interfaces/animals";
import animalUpdateFoundService from "../../services/animals/animalUpdateFound.service";

const updateAnimalFoundController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { found }: IAnimalsFound = req.body;

    const animal = await animalUpdateFoundService({ id, found });

    return res.status(200).send(animal);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(401).send({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export default updateAnimalFoundController;
