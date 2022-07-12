import { NextFunction, Request, Response } from "express"

const verifyFieldsAnimalsCreateMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const { name ,breed, species, description, image, lastLocation, lastDate, userId } = req.body

    if (!name || !breed || !species || !description || !image || !lastLocation || !lastDate || !userId) {
        return res.status(401).json({
            message: "it is necessary to fill in all the fields"
        })
    }

    next()
}

export default verifyFieldsAnimalsCreateMiddleware