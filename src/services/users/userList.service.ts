import { AppDataSource } from "../../data-source"
import { User } from "../../entities/users.entities"
import { IUser } from "../../interfaces/user"

const userListService = async () : Promise<IUser[]> => {

    const userRepository = AppDataSource.getRepository(User)

    const users = await userRepository.find()

    return users
}

export default userListService