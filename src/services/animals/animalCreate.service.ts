import { AppDataSource } from "../../data-source";
import { Animals } from "../../entities/animals.entities";

const animalCreateService = async (name: string, breed: string, species: string, description: string, image: string, lastLocation: string, lastDate: string, found: boolean, userId: string) => {
  const userRepository = AppDataSource.getRepository(Animals);

  const animal = new Animals();
  animal.name = name;
  animal.breed = breed
  animal.species = species
  animal.description = description
  animal.image = image
  animal.lastLocation = lastLocation
  animal.lastDate = lastDate
  animal.found = found

  userRepository.create(animal);
  await userRepository.save(animal);

  return animal
};

export default animalCreateService;