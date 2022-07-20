import { AppDataSource } from "../../data-source"
import { User } from "../../entities/users.entities"
import { AppError } from "../../errors/appError"

const userDeleteService = async (id: string, userId: string) => {
    
    const userRepository = AppDataSource.getRepository(User)
    
    const users = await userRepository.find()
    
    const user = users.find((element) => element.id === id)

    if (!user) {
        throw new AppError(404,"User not found")
    }
    
    if (id !== userId) {
        throw new AppError(401, "you cannot delete another user")
    }
    
    await userRepository.delete(id)

    return true
}

export default userDeleteService