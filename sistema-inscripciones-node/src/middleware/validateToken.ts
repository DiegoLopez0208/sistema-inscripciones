import type { Request, Response, NextFunction } from 'express';
import logger from '@/utils/winston';
import httpStatusCodes from '@/helpers/httpStatus';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: string,
  name: string,
  surname: string,
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export const validateTokenJWT = (req: Request & { user?: JwtPayload }, res: Response, next: NextFunction) => {

  // Intenta obtener el token de las cookies o del header Authorization
  const token = req.signedCookies.access_token

  logger.info("token", token);

  try {
    if (!token) {
      return res.status(httpStatusCodes.UNAUTHORIZED).json({ message: 'No token provided' });
    }

    // Decodifica el token si está codificado
    const decodedToken = decodeURIComponent(token);

    // Verifica y decodifica el token JWT
    const decoded = jwt.verify(decodedToken, process.env.SECRET_JWT_KEY as string) as JwtPayload;
    logger.info("Token decodificado:", decoded);

    // Valida que el token tenga los campos necesarios
    if (!decoded.id || !decoded.name || decoded.surname || !decoded.email || !decoded.role) {
      return res.status(httpStatusCodes.UNAUTHORIZED).json({ message: 'Invalid token payload id, name,surname, role, email' });
    }

    // Agrega el token decodificado al objeto req
    req.user = decoded;
    return next();

  } catch (err) {
    logger.error("error al verificar token", err);
    return res.status(httpStatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
  }
};

export const isAdmin = (req: Request & { user?: JwtPayload }, res: Response, next: NextFunction) => {
  logger.info("req.user de is admin", req.user);
  if (req.user?.role !== 'ADMIN') {
    return res.status(httpStatusCodes.FORBIDDEN).json({ message: 'Access denied: Admins only' });
  }
  next();
};