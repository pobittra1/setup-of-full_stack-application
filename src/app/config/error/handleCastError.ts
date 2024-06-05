import mongoose from "mongoose";
import { TEroorSource, TGenericsErrorResponse } from "../../interface/error";

const handleCastError = (
  err: mongoose.Error.CastError
): TGenericsErrorResponse => {
  const errorSources: TEroorSource = [
    {
      path: err.path,
      message: err.message,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: "Invalid id",
    errorSources,
  };
};

export default handleCastError;
