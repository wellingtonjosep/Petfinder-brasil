import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entities";
import bcryptjs from "bcryptjs";
import { AppError } from "../../errors/appError";
import { IUserUpdate } from "../../interfaces/user";

const userUpdateService = async ({
  id,
  name,
  email,
  contact,
  password,
}: IUserUpdate) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id });

  if (!user) {
    throw new AppError(404, "not found user");
  }

  const newUser = {
    name: name || user.name,
    email: email || user.email,
    contact: contact || user.contact,
    isAdm: user.isAdm,
    password: user.password,
  };

  password && (newUser.password = bcryptjs.hashSync(password, 10));

  await userRepository.update(user!.id, { ...newUser, updated_at: new Date() });

  return { ...newUser, password: undefined };
};

export default userUpdateService;
