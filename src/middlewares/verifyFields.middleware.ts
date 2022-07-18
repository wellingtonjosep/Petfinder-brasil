import { NextFunction, Request, Response } from "express";

const verifyFieldsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password, isAdm } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "fill in all fields",
    });
  }

  if (isAdm === undefined) {
    return res.status(400).json({
      message: "fill in all fields"
    })
  }

  next();
};

export default verifyFieldsMiddleware;
