import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../config/error/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import { TUserRole } from "../modules/user/user.interface";
import config from "../config";
const auth = (...requiredRoles: TUserRole[]) => {
  //using catchAsync middleware
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //console.log("request", req);
    //get teoken from client
    const token = req.headers.authorization;
    //console.log("token", token);
    //console.log(token);
    // checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }
    //check if the token is valid
    // const decoded = jwt.verify(
    //   token,
    //   config.jwt_access_secret as string,
    //   function (err, decoded) {
    //     console.log(decoded);
    //     if (err) {
    //       throw new AppError(
    //         httpStatus.UNAUTHORIZED,
    //         "You are not authorized!"
    //       );
    //     }

    //     //decoded undefined
    //     req.user = decoded as any;
    //   }
    // );
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
