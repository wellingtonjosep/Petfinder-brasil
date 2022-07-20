"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verifyIdParamsMiddleware = (req, res, next) => {
    try {
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid Id" });
    }
};
exports.default = verifyIdParamsMiddleware;
