import jwt from "jsonwebtoken";

export const createToken = (
  jwtPayload: { userId: string; role: string }, //or we can set record string unknown
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
