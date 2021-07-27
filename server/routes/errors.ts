import { Request, Response, NextFunction } from "express";
import HttpException from "../types/HttpException";

const globalErrorHandler = (
  error: HttpException,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = error.status || 500;
  const message =
    error.message ||
    "Express error handler caught unknown middleware exception.";
  return res.status(status).send({ message });
};

export default globalErrorHandler;
