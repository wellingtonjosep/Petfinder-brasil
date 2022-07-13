import { AppDataSource } from "../../data-source";
import { Animals } from "../../entities/animals.entities";

const animalLostListService = async () => {
  const animalsRepository = AppDataSource.getRepository(Animals);

  const animals = await animalsRepository.find();

  const animalsLost = animals.filter((animal) => animal.found !== false);

  return animalsLost;
};

export default animalLostListService;
