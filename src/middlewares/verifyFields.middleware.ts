import { NextFunction, Request, Response } from "express";

const verifyFieldsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "fill in all fields",
    });
  }

  if (email === "") {
    res.status(400).json({
      message: "Email not found",
    });
  }

  if (name === "") {
    res.status(400).json({
      message: "Name not found",
    });
  }

  if (password === "") {
    res.status(400).json({
      message: "Password not found",
    });
  }

  next();
};

export default verifyFieldsMiddleware;
