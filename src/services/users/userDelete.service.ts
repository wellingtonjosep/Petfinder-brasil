import { AppDataSource } from "../../data-source"
import { User } from "../../entities/users.entities"

const userDeleteService = async (id: string) => {

    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOneBy({id})

    await userRepository.delete(id)

    return true
}

export default userDeleteService