import { AppDataSource } from "../../data-source";
import { Animals } from "../../entities/animals.entities";
import { Comments } from "../../entities/comments";

const findAnimalsCommentsService = async (id: string, comments: string) => {
  const animalRepository = AppDataSource.getRepository(Animals);
  const commentsRepository = AppDataSource.getRepository(Comments);

  const comment = await commentsRepository.findOne({
    where: {
      id: comments,
    },
  });

  if (!comment) {
    throw "not found comments";
  }

  const animal = await animalRepository.findOne({
    where: {
      id: id,
    },
    relations: ["comments"],
  });

  if (!animal) {
    throw "not found comments";
  }

  const animalNameComments = [
    { name: animal.name, found: animal.found, comments: animal.comments },
  ];

  return animalNameComments;
};

export default findAnimalsCommentsService;
