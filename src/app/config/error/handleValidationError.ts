import mongoose from "mongoose";
import { TEroorSource, TGenericsErrorResponse } from "../../interface/error";

const handleValidationError = (
  err: mongoose.Error.ValidationError
): TGenericsErrorResponse => {
  const errorSources: TEroorSource = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    }
  );

  const statusCode = 400;

  return {
    statusCode,
    message: "validation error",
    errorSources,
  };
};

export default handleValidationError;
