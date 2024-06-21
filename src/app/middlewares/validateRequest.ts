import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import catchAsync from "../utils/catchAsync";

const validateRequest = (schema: AnyZodObject) => {
  //using catchAsync middleware
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    });
    next();
  });
  //using try catch block
  // try {
  //   //validation
  //   await schema.parseAsync({
  //     body: req.body,
  //   });
  //   next();
  // } catch (err) {
  //   next(err);
  // }
};

export default validateRequest;
