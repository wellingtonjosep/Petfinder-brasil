import { AppDataSource } from "../../data-source"
import { Animals } from "../../entities/animals.entities"
import { User } from "../../entities/users.entities"

const userAnimalsService = async (id: string): Promise<Animals[]> => {

    const userRepository = AppDataSource.getRepository(User) 

    const user = await userRepository.findOneBy({id: id})

    return user!.animal
}

export default userAnimalsService