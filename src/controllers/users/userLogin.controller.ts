import { Request, Response } from "express"
import { AppError, handleError } from "../../errors/appError"
import userLoginService from "../../services/users/userLogin.service"

const userLoginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        const response = await userLoginService(email, password)

        return res.status(200).json({
            token: response
        })
    } catch (err) {
        if (err instanceof AppError) {
          handleError(err, res);
        }
      }
}

export default userLoginController