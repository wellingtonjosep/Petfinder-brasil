import userUpdateService from "../../services/users/userUpdate.service"
import { Request, Response } from "express"

const userUpdateController = async (req: Request, res: Response) => {
    try {

        const { name, email, password, contact } = req.body

        const { id } = req.params

        const response = await userUpdateService(id, name, email, password, contact)

        return res.status(200).json(response)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(403).json({
                error: err.name,
                message: err.message
            })
        }
    }
}

export default userUpdateController