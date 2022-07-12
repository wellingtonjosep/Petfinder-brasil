import { AppDataSource } from "../../data-source";
import { Animals } from "../../entities/animals.entities";

const animalCreateService = async (name: string) => {
  const userRepository = AppDataSource.getRepository(Animals);

  const animal = new Animals();
  animal.name = name;

  userRepository.create(animal);
  await userRepository.save(animal);

  return 
};

export default animalCreateService;