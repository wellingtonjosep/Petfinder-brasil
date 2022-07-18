import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entities";
import bcryptjs from "bcryptjs";
import { IUserCreate } from "../../interfaces/user";

const userCreateService = async ({
  name,
  email,
  contact,
  isAdm,
  password,
}: IUserCreate) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = new User();
  user.name = name;
  user.email = email;
  user.contact = contact;
  user.isAdm = isAdm;
  user.password = bcryptjs.hashSync(password, 10);
  user.created_at = new Date();
  user.updated_at = new Date();

  userRepository.create(user);
  await userRepository.save(user);

  return { ...user, password: undefined };
};

export default userCreateService;
