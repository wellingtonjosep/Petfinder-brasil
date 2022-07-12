import { AppDataSource } from "../../data-source";
import { Animals } from "../../entities/animals.entities";
import { User } from "../../entities/users.entities";
import userCreateService from "../users/userCreate.service";

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
    throw new Error("user not exist");
  }

  console.log(user);

  // const animal = new Animals();
  // animal.name = name;
  // animal.breed = breed;
  // animal.species = species;
  // animal.description = description;
  // animal.image = image;
  // animal.lastLocation = lastLocation;
  // animal.lastDate = lastDate;
  // animal.found = found;
  // animal.user = user;

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

  return animal;
};

export default animalCreateService;
