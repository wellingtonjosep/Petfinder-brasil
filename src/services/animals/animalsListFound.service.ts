import { AppDataSource } from "../../data-source";
import { Animals } from "../../entities/animals.entities";

const animalsFoundListService = async () => {
  const animalsRepository = AppDataSource.getRepository(Animals);

  const animals = await animalsRepository.find();

  const animalsFound = animals.filter((animal) => animal.found === true);

  return { "length": animalsFound.length, List: animalsFound };
};

export default animalsFoundListService;
