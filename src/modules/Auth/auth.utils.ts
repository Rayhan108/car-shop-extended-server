import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
export const createToken = (
  jwtPayload: { userId: string; role: string },
  secret: string,
  expiresIn: string | number,
) => {
  return jwt.sign(jwtPayload, secret, { expiresIn } as SignOptions);
};
export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};