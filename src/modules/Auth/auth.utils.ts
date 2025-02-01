import jwt, { SignOptions } from 'jsonwebtoken';
export const createToken = (
  jwtPayload: { userId: string; role: string },
  secret: string,
  expiresIn: string | number,
) => {
  return jwt.sign(jwtPayload, secret, { expiresIn } as SignOptions);
};
