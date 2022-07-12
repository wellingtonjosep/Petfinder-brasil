import { AppDataSource } from "../../data-source";
import { Animals } from "../../entities/animals.entities";
import { Comments } from "../../entities/userAnimalsComments.entities";
import { User } from "../../entities/users.entities";
import { AppError } from "../../errors/appError";

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
    comment,
    user,
    animals,
  });

  await commentsRepository.save(newComment);

  return { ...newComment, user: undefined, animals: undefined };
};

export default commentsCreateService;
