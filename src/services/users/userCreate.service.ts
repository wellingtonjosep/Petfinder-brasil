import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entities";
import bcrypt from "bcrypt";

const userCreateService = async (
  name: string,
  email: string,
  password: string,
  contact: string
) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = new User();
  user.name = name;
  user.email = email;
  user.contact = contact;
  user.password = bcrypt.hashSync(password, 10);

  userRepository.create(user);
  await userRepository.save(user);

  return { ...user, password: undefined };
};

export default userCreateService;
