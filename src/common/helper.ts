import { validationResult } from "express-validator";
import * as HttpStatus from "http-status";
import { Request, Response, NextFunction } from "express";

export const formValidatorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result: any = validationResult(req);
  if (result.errors.length !== 0) {
    return res.status(HttpStatus.BAD_REQUEST).json(result);
  }
  next();
};
