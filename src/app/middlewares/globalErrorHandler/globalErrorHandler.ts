import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue } from "zod";
import { TEroorSource } from "../../interface/error";
import config from "../../config";
import handleZodError from "../../config/error/handleZodError";
import handleValidationError from "../../config/error/handleValidationError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  //setting default values
  let statusCode = err.statusCode || 500;
  let message = err.message || "something went wrong";

  let errorSources: TEroorSource = [
    {
      path: "",
      message: "something went wrong",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    // err,
    stack: config.NODE_ENV === "development" ? err?.stack : null,
  });
};

export default globalErrorHandler;
