import { AppDataSource } from "../../data-source";
import { Animals } from "../../entities/animals.entities";
import { AppError } from "../../errors/appError";
import { IAnimals } from "../../interfaces/animals";

const animalUpdateService = async ({
  id,
  name,
  breed,
  species,
  description,
  image,
  lastLocation,
  lastDate,
  found,
}: IAnimals) => {
  const animalRepository = AppDataSource.getRepository(Animals);

  const animal = await animalRepository.findOneBy({ id });

  if (!animal) {
    throw new AppError(404, "Animal not found!");
  }

  const newAnimal = {
    name: name || animal.name,
    breed: breed || animal.breed,
    species: species || animal.species,
    description: description || animal.description,
    image: image || animal.image,
    lastLocation: lastLocation || animal.lastLocation,
    lastDate: lastDate || animal.lastDate,
    found: found || animal.found,
  };

  await animalRepository.update(animal!.id, {
    ...newAnimal,
    updated_at: new Date(),
  });

  return { ...newAnimal, updated_at: animal.updated_at, created_at: animal.created_at, id: animal.id };
};

export default animalUpdateService;
