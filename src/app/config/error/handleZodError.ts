import { ZodError, ZodIssue } from "zod";
import { TEroorSource, TGenericsErrorResponse } from "../../interface/error";

const handleZodError = (err: ZodError): TGenericsErrorResponse => {
  const errorSources: TEroorSource = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: "validation error",
    errorSources,
  };
};

export default handleZodError;
