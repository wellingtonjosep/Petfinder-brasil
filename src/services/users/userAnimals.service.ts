import { AppDataSource } from "../../data-source"
import { Animals } from "../../entities/animals.entities"
import { User } from "../../entities/users.entities"
import { AppError } from "../../errors/appError"

const userAnimalsService = async (id: string): Promise<Animals[]> => {

    const userRepository = AppDataSource.getRepository(User) 

    const users = await userRepository.find()

    const user = users.find((element) => element.id === id)

    if (!user) {
        throw new AppError(404,"User not found")
    }

    return user!.animal
}

export default userAnimalsService