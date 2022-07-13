import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/appError";

import { Comments } from "../../entities/comments";
import { User } from "../../entities/users.entities";
import { Animals } from "../../entities/animals.entities";

const commentsCreateService = async (
  comment: string,
  userId: string,
  animalsId: string
) => {
  const userRepository = AppDataSource.getRepository(User);
  const animalsRepository = AppDataSource.getRepository(Animals);
  const commentsRepository = AppDataSource.getRepository(Comments);

  const user = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  const animals = await animalsRepository.findOne({
    where: {
      id: animalsId,
    },
  });

  if (!user || !animals) {
    throw new AppError(404, "user or animals not exist");
  }

  const newComment = commentsRepository.create({
    animals,
    comment,
    user,
    userName: user.name,
    created_at: new Date(),
  });

  await commentsRepository.save(newComment);

  return { ...newComment, animals: undefined, user: undefined };
};

export default commentsCreateService;
