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

  const user = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new AppError(404,"user not exist");
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
  });

  await animalsRepository.save(animal);

  return {...animal, user: animal.user.id};
};

export default animalCreateService;
