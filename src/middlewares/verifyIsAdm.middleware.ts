import { Request, Response, NextFunction } from "express";

const verifyIsAdmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isAdm = req.isAdm;

  if (!isAdm) {
    return res.status(401).json({ message: "you're not admin" });
  }
  next();
};

export default verifyIsAdmMiddleware;
