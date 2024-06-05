import mongoose from "mongoose";
import { TEroorSource } from "../../interface/error";

const handleDuplicateError = (err: any) => {
  // Extract value within double quotes using regex
  const match = err.message.match(/"([^"]*)"/);

  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1];

  const errorSources: TEroorSource = [
    {
      path: "",
      message: `${extractedMessage} is already exists`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: "validation error",
    errorSources,
  };
};

export default handleDuplicateError;
