"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verifyFieldsAnimalsCreateMiddleware = (req, res, next) => {
    const { name, breed, species, description, image, lastLocation, lastDate, userId } = req.body;
    if (!name || !breed || !species || !description || !image || !lastLocation || !lastDate || !userId) {
        return res.status(401).json({
            message: "it is necessary to fill in all the fields"
        });
    }
    next();
};
exports.default = verifyFieldsAnimalsCreateMiddleware;
