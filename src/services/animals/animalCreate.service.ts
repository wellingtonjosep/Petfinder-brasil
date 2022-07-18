import { AppDataSource } from "../../data-source";
import { Animals } from "../../entities/animals.entities";
import { User } from "../../entities/users.entities";
import { AppError } from "../../errors/appError";

const animalCreateService = async (
  name: string,
  breed: string,
  species: string,
  description: string,
  image: string,
  lastLocation: string,
  lastDate: string,
  found: boolean,
  userId: string
) => {
  const animalsRepository = AppDataSource.getRepository(Animals);
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find()

  const user = users.find((element) => element.id === userId )

  if (!user) {
    throw new AppError(404, "user not exist");
  }

  const animal = animalsRepository.create({
    name,
    breed,
    species,
    description,
    image,
    lastLocation,
    lastDate,
    found,
    user,
    created_at: new Date(),
    updated_at: new Date(),
  });

  await animalsRepository.save(animal);

  return { ...animal, user: animal.user.id };
};

export default animalCreateService;
