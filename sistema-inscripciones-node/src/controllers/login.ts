import type { Request, Response, NextFunction } from 'express';
import { serviceLogin, serviceRegister, serviceGoogleLogin } from '@/service/sessionService';
import jwt from 'jsonwebtoken';
import logger from '@/utils/winston';
import httpStatusCodes from '@/helpers/httpStatus';
import type { LoginSession } from '@/types/loginForm';
import { Time } from "@/types/timesTypes"

interface JwtPayload {
  id: string,
  name: string,
  surname: string,
  email: string;
  role: string;
  iat: number;
  exp: number;
}

type SameSiteType = 'strict' | 'lax' | 'none';

const SETUPCOOKIE = {
  KEYCOOKIE: 'access_token',
  KEYREFRESH: 'refresh_token',
  TIME_COOKIE: Time.Hour,
  TIME_COOKIE_REFRESH: Time.Week,
  SECUREMODE: process.env.NODE_ENV === 'production',
  SAME_SITE: "none" as SameSiteType,
  HTTP_ONLY: true,
  SIGNED: true,
  FIRMS_COOKIES: process.env.COOKIE_SECRET,
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: LoginSession = req.body;

  try {
    if (!email.endsWith('@gmail.com')) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: 'El correo electrónico debe terminar en @gmail.com',
      });
    }
    const result = await serviceLogin(email, password);
    if (!result) {
      return res.status(httpStatusCodes.UNAUTHORIZED).json({
        message: 'Invalid credentials',
      });
    }


    const { tokenRefresh, token, user } = result;
    res.cookie(SETUPCOOKIE.KEYCOOKIE, token, {
      httpOnly: SETUPCOOKIE.HTTP_ONLY,
      secure: SETUPCOOKIE.SECUREMODE,
      sameSite: SETUPCOOKIE.SAME_SITE,
      maxAge: SETUPCOOKIE.TIME_COOKIE,
      signed: SETUPCOOKIE.SIGNED

    });

    res.cookie(SETUPCOOKIE.KEYREFRESH, tokenRefresh, {
      httpOnly: SETUPCOOKIE.HTTP_ONLY,
      secure: SETUPCOOKIE.SECUREMODE,
      sameSite: SETUPCOOKIE.SAME_SITE,
      maxAge: SETUPCOOKIE.TIME_COOKIE_REFRESH,
      signed: SETUPCOOKIE.SIGNED
    });

    return res.status(httpStatusCodes.OK).json({
      message: 'Login successful',
      user: user,
    });
  } catch (error) {
    logger.error("Error al realizar login:", error);
    next(error);
  }
};

export const refreshToken = (req: Request, res: Response, next: NextFunction) => {
  const refreshTokenCookie = req.signedCookies.refresh_token;
  try {
    if (!refreshTokenCookie) {
      return res.status(httpStatusCodes.UNAUTHORIZED).json({ message: 'Refresh token missing or invalid' });
    }
    const decoded = jwt.verify(refreshTokenCookie, process.env.SECRET_JWT_KEY as string) as JwtPayload;

    const newToken = jwt.sign({
      id: decoded.id,
      name: decoded.name,
      surname: decoded.surname,
      email: decoded.email,
      role: decoded.role
    }, process.env.SECRET_JWT_KEY as string, {
      expiresIn: SETUPCOOKIE.TIME_COOKIE,
      algorithm: 'HS256'
    });

    res.cookie(SETUPCOOKIE.KEYCOOKIE, newToken, {
      httpOnly: SETUPCOOKIE.HTTP_ONLY,
      secure: SETUPCOOKIE.SECUREMODE,
      sameSite: SETUPCOOKIE.SAME_SITE,
      maxAge: SETUPCOOKIE.TIME_COOKIE,
      signed: SETUPCOOKIE.SIGNED
    });
    return res.status(httpStatusCodes.OK).json({ message: 'Token refreshed successfully' });
  } catch (err) {
    logger.error("Refresh Token error:", err)
    return res.status(httpStatusCodes.UNAUTHORIZED).json({ message: 'Invalid refresh token' });
  }
};

export const logoutUser = async (_req: Request, res: Response, _next: NextFunction) => {
  try {
    res.clearCookie(SETUPCOOKIE.KEYCOOKIE, { httpOnly: true, secure: SETUPCOOKIE.SECUREMODE });
    res.clearCookie(SETUPCOOKIE.KEYREFRESH, { httpOnly: true, secure: SETUPCOOKIE.SECUREMODE });
    return res.status(httpStatusCodes.OK).json({ message: 'Logout successful' });
  } catch (error) {
    logger.error("Error during logout:", error);
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Logout failed' });
  }
};


export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: LoginSession = req.body;

  try {
    if (!email.endsWith('@gmail.com')) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: 'El correo electrónico debe ser válido y terminar en @gmail.com',
      });
    }

    if (password.length < 7) {
      return res.status(httpStatusCodes.BAD_REQUEST).json({
        message: 'La contraseña debe tener al menos 7 caracteres',
      });
    }

    const userRegister = await serviceRegister(req.body);
    logger.info(`Login exitoso para usuario: ${req.body}`)


    return res.status(httpStatusCodes.CREATED).json({
      message: 'Registro exitoso',
      data: userRegister
    });
  } catch (error) {
    next(error);
  }
};

export const googleLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id_token } = req.body;
    const result = await serviceGoogleLogin(id_token);

    const { token, tokenRefresh, user } = result;

    res.cookie(SETUPCOOKIE.KEYCOOKIE, token, {
      httpOnly: SETUPCOOKIE.HTTP_ONLY,
      secure: SETUPCOOKIE.SECUREMODE,
      sameSite: SETUPCOOKIE.SAME_SITE,
      maxAge: SETUPCOOKIE.TIME_COOKIE,
      signed: SETUPCOOKIE.SIGNED
    });

    res.cookie(SETUPCOOKIE.KEYREFRESH, tokenRefresh, {
      httpOnly: SETUPCOOKIE.HTTP_ONLY,
      secure: SETUPCOOKIE.SECUREMODE,
      sameSite: SETUPCOOKIE.SAME_SITE,
      maxAge: SETUPCOOKIE.TIME_COOKIE_REFRESH,
      signed: SETUPCOOKIE.SIGNED
    });

    return res.status(httpStatusCodes.OK).json({
      message: 'Google login successful',
      user: user,
    });
  } catch (error) {
    next(error);
  }
};