import userCreateService from "../../services/users/userCreate.service";
import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/appError";

const userCreateController = async (req: Request, res: Response) => {

    try {
        const { name, email, password, contact } = req.body

        console.log("ola")

        const response = await userCreateService(name, email, password, contact)

        return res.status(201).json(response)
    } catch (err) {
        if (err instanceof AppError) {
          handleError(err, res);
        }
      }

}

export default userCreateController