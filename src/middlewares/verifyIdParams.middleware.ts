import { Request, Response, NextFunction } from "express";

const verifyIdParamsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    return res.status(401).json({ message: "Invalid Id" });
  }
};

export default verifyIdParamsMiddleware;
