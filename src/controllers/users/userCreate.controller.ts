import userCreateService from "../../services/users/userCreate.service";
import { Request, Response } from "express";

const userCreateController = async (req: Request, res: Response) => {

    try {
        const { name, email, password } = req.body

        console.log("ola")

        const response = await userCreateService(name, email, password)

        return res.status(201).json(response)
    } catch (err) {
        if (err instanceof Error) {
            return res.status(400).json({
                error: err.name,
                message: err.message
            })
        }
    }

}

export default userCreateController