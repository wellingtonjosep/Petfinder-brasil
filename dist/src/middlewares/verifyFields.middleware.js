"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verifyFieldsMiddleware = (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "fill in all fields",
        });
    }
    next();
};
exports.default = verifyFieldsMiddleware;
