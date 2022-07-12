import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entities";
import bcrypt from "bcrypt";

const userUpdateService = async (
  id: string,
  name: string,
  email: string,
  password: string,
  contact: string
) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id });

  name && (user!.name = name);
  email && (user!.email = email);
  contact && (user!.contact = contact);
  password && (user!.password = bcrypt.hashSync(password, 10));

  // await userRepository.update(id, { ...user, update_at: new Date() });

  return { ...user, password: undefined };
};

export default userUpdateService;
