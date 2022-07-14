import { AppDataSource } from "../../data-source";
import { Animals } from "../../entities/animals.entities";
import { AppError } from "../../errors/appError";
import { IAnimalsFound } from "../../interfaces/animals";

const animalUpdateFoundService = async ({ id, found }: IAnimalsFound) => {
  const animalRepository = AppDataSource.getRepository(Animals);

  const animal = await animalRepository.findOneBy({ id });

  if (!animal) {
    throw new AppError(404, "Animal not found!");
  }
  const newAnimal = {
    found: true,
  };
  await animalRepository.update(animal!.id, {
    ...newAnimal,
    updated_at: new Date(),
  });

  return { message: `${animal.name} encontrou seu dono.` };
};

export default animalUpdateFoundService;
