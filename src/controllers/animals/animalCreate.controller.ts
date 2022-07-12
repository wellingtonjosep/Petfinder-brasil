import animalCreateService from "../../services/animals/animalCreate.service"
import { Request, Response } from "express"
const animalCreateController = async (req: Request, res: Response) => {
    try {
        const { name, } = req.body
    } catch (err) {
        if (err instanceof Error) {
            return 
        }
    }
}

export default animalCreateController