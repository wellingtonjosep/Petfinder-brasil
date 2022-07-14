import { AppDataSource } from "../../data-source";
import { Animals } from "../../entities/animals.entities";
import { Comments } from "../../entities/comments";

const findAnimalsCommentsService = async (id: string): Promise<Comments[]> => {
  const userRepository = AppDataSource.getRepository(Animals);

  const animal = await userRepository.findOneBy({ id: id });

  return animal!.comments;
};

export default findAnimalsCommentsService;
