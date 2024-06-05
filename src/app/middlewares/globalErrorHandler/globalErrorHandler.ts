import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue } from "zod";
import { TEroorSource } from "../../interface/error";
import config from "../../config";
import handleZodError from "../../config/error/handleZodError";
import handleValidationError from "../../config/error/handleValidationError";
import handleCastError from "../../config/error/handleCastError";
import handleDuplicateError from "../../config/error/handleDuplicateError";
import AppError from "../../config/error/AppError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  //setting default values
  let statusCode = 500;
  let message = "something went wrong";

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
  } else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
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
