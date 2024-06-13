import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../config/error/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import { TUserRole } from "../modules/user/user.interface";
import config from "../config";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}
const auth = (...requiredRoles: TUserRole[]) => {
  //using catchAsync middleware
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //get token from client
    const token = req.headers.authorization;
    // checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }
    //check if the token is valid
    jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (err, decoded) {
        if (err) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            "You are not authorized!"
          );
        }
        const role = (decoded as JwtPayload).role;
        if (requiredRoles && !requiredRoles.includes(role)) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            "You are not authorized  hi!"
          );
        }
        //assign user as property of req
        req.user = decoded as JwtPayload;
        next();
      }
    );
  });
};

export default auth;
