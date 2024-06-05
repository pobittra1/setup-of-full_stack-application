import mongoose from "mongoose";
import { TEroorSource } from "../../interface/error";

type TGenericsErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TEroorSource;
};

const handleValidationError = (err: mongoose.Error.ValidationError) => {
  const errorSources: TEroorSource = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    }
  );

  const statusCode = 400;
  const some = "something";
  return {
    some,
    statusCode,
    message: "validation error",
    errorSources,
  };
};

export default handleValidationError;
