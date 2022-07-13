import { Request, Response } from 'express'
import { AppError, handleError } from '../../errors/appError'
import userAnimalsService from '../../services/users/userAnimals.service'

const userAnimalsController = async (req: Request, res: Response) => {

    try {

        const id = req.params.id
        const userAnimals = await userAnimalsService(id)

        return res.json(userAnimals)
        
    } catch (err) {

        if (err instanceof AppError) {
            handleError(err, res)
        }
    }
}

export default userAnimalsController