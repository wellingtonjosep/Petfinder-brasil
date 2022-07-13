import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entities";
import bcrypt from "bcrypt";
import { AppError } from "../../errors/appError";

const userUpdateService = async (
  id: string,
  name: string,
  email: string,
  password: string,
  contact: string
) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id });

  if (!user) {
    throw new AppError(404, "not found user");
  }

  const newUser = {
    name: name || user.name,
    email: email || user.email,
    contact: contact || user.contact,
    password: bcrypt.hashSync(password, 10) || user.password,
  };

  await userRepository.update(user!.id, { ...newUser, updated_at: new Date() });

  return { ...newUser, password: undefined };
};

export default userUpdateService;
