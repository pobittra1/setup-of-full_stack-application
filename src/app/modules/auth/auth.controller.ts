import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  const result = await authService.loginUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user is logged in succesfully",
    data: result,
  });
});

export const authController = {
  loginUser,
};
