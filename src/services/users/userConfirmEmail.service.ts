import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entities";
import { AppError } from "../../errors/appError";
import { IUserConfirm } from "../../interfaces/user";

const userConfirmService = async ({ id, email_confirm }: IUserConfirm) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id });

  if (!user) {
    throw new AppError(404, "not found user");
  }

  const newUser = {
    email_confirm: (email_confirm = true),
  };

  await userRepository.update(user!.id, { ...newUser });

  return newUser;
};

export default userConfirmService;
