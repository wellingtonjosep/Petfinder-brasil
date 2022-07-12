import userCreateService from "../../services/users/userCreate.service";
import { Request, Response } from "express";

const userCreateController = async (req: Request, res: Response) => {

    try {
        const { name, email, password, contact } = req.body

        console.log("ola")

        const response = await userCreateService(name, email, password, contact)

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