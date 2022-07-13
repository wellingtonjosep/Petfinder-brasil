import { AppDataSource } from "../../data-source";
import { Animals } from "../../entities/animals.entities";
import { IAnimals } from "../../interfaces/animals";

const animalLostListService = async () => {
  const animalsRepository = AppDataSource.getRepository(Animals);

  const animals = await animalsRepository.find();

  const animalsFound = await animals.find((animal) => animal.found === false);

  return animalsFound;
};

export default animalLostListService;
