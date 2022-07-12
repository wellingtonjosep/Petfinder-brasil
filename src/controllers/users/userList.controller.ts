import { Request, Response } from "express"
import { AppError, handleError } from "../../errors/appError"
import userListService from "../../services/users/userList.service"

const userListController = async (req: Request, res: Response) => {
    try {

        const response = await userListService()

        return res.status(200).json({
            users: response
        })
    } catch (err) {
        if (err instanceof AppError) {
          handleError(err, res);
        }
      }
} 
export default userListController