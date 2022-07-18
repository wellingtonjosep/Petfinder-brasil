import { AppDataSource } from "../../data-source";
import { Animals } from "../../entities/animals.entities";

const animalLostListService = async () => {
  const animalsRepository = AppDataSource.getRepository(Animals);

  const animals = await animalsRepository.find();

  const animalsLost = animals.filter((animal) => animal.found === false);

  return { "Number of animals lost": animalsLost.length, List: animalsLost };
};

export default animalLostListService;
