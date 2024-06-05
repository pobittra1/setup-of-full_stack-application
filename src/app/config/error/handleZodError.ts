import { ZodError, ZodIssue } from "zod";
import { TEroorSource } from "../../interface/error";

const handleZodError = (err: ZodError) => {
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
