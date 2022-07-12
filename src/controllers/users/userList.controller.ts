import { Request, Response } from "express"
import userListService from "../../services/users/userList.service"

const userListController = async (req: Request, res: Response) => {
    try {

        const response = await userListService()

        return res.status(200).json({
            users: response
        })
    } catch (err) {
        if (err instanceof Error) {
            return res.status(400).json({
                error: err.name,
                message: err.message
            })
        } 
    }
} 
export default userListController