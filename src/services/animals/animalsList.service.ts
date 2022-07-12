import { AppDataSource } from "../../data-source";
import { Animals } from "../../entities/animals.entities";
import { IAnimals } from "../../interfaces/animals";

const animalListService = async (): Promise<IAnimals[]> => {
  const animalsRepository = AppDataSource.getRepository(Animals);

  const animals = await animalsRepository.find();

  return animals;
};

export default animalListService;
