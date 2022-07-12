import { AppDataSource } from "../../data-source"
import { User } from "../../entities/users.entities"
import bcrypt from "bcrypt"

const userUpdateService = async (id: string, name: string, email: string, password: string) => {

    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOneBy({id})

    if (!user) {
        throw new Error("User not found")
    }

    name && (user.name = name)
    email && (user.email = email)
    password && (user.password = bcrypt.hashSync(password, 10))

    await userRepository.update(id, {...user})

    return {...user, password: undefined}
}

export default userUpdateService