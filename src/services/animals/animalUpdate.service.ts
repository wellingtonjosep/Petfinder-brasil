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

  const animal = await animalRepository.findOneBy({id});

  if (!animal) {
    throw new AppError(404, "Animal not found!");
  }

  name && (animal.name = name)
  breed && (animal.breed = breed) 
  species && (animal.species = species)
  description && (animal.species = description) 
  image && (animal.image = image)
  lastLocation && (animal.lastLocation = lastLocation) 
  lastDate && (animal.lastDate = lastDate) 
  found && (animal.found = found) 

  await animalRepository.update(animal!.id, {...animal, updated_at: new Date()});

  return { ...animal };
};

export default animalUpdateService;
