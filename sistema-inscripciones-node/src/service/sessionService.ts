import prisma from "@/libs/prisma";
import { verified, encrypt } from "@/utils/bcrypt"
import jwt from 'jsonwebtoken';
import { UserRole, AuthProvider, type User } from '@prisma/client';
import logger from "@/utils/winston";
import { CustomError } from "@/utils/errorCustomer";
import httpStatusCodes from "@/helpers/httpStatus";
import { clientGoogle } from "@/libs/google"

interface LoginResponse {
  token: string;
  tokenRefresh: string;
  user: Omit<User, 'password'>;
}

const generateAccessToken = (user: Omit<User, 'password'>) => {
  return jwt.sign({
    id: user.id,
    email: user.email,
    name: user.name,
    surname: user.surname ?? null,
    role: user.role,
  }, process.env.SECRET_JWT_KEY as string, {
    expiresIn: '1h',
    algorithm: 'HS256'
  });
}
const generateRefreshToken = (user: Omit<User, 'password'>) => {
  return jwt.sign({
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
    surname: user.surname ?? null
  }, process.env.SECRET_JWT_KEY as string, {
    expiresIn: '7d',
    algorithm: 'HS256'
  });
}

export async function serviceLogin(email: string, password: string): Promise<LoginResponse> {
  try {
    if (!email.endsWith('@gmail.com')) {
      throw new Error('El correo electrónico debe terminar en @gmail.com');
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user || !user.password) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await verified(password, user.password);

    if (!isMatch) {
      throw new Error('invalid credential');
    }

    const token = generateAccessToken(user)
    const tokenRefresh = generateRefreshToken(user)

    return {
      tokenRefresh,
      token,
      user
    };
  } catch (error) {
    logger.error("Error en el servicio de login:", error);
    throw error;
  }
}

export const serviceGoogleLogin = async (id_token: string): Promise<LoginResponse> => {
  try {
    const ticket = await clientGoogle.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      throw new Error('Invalid Google token');
    }

    const { email, name, } = payload;

    const userEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (!userEmail) {
      throw new Error('invalid credential');
    }

    const user = await prisma.user.create({
      data: {
        email: email as string,
        name: name || 'Google User',
        password: null,
        surname: null,
        role: UserRole.STUDENT,
        authProvider: AuthProvider.GOOGLE,
        createdAt: Date.now().toString(),
        updatedAt: Date.now().toString(),
      },
      select: {
        id: true,
        email: true,
        name: true,
        surname: true,
        password: false,
        authProvider: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      }

    });

    const token = generateAccessToken(user)
    const tokenRefresh = generateRefreshToken(user)

    return { token, tokenRefresh, user };
  } catch (error) {
    logger.error("Error en el servicio de login:", error);
    throw new Error('Google login failed: ' + error);
  }
}


export async function serviceRegister(userData: User): Promise<Omit<User, 'password'>> {
  const { email, password, name, surname, id, role } = userData;
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      throw new CustomError('invalid credential', httpStatusCodes.CONFLICT);
    }

    if (!password) {
      throw new CustomError('invalid credential', httpStatusCodes.BAD_REQUEST);
    }

    const hashedPassword = encrypt(password);

    const newUser = await prisma.user.create({
      data: {
        id: id,
        name: name,
        surname: surname,
        email: email,
        password: hashedPassword,
        role: role,
      },
      select: {
        id: true,
        email: true,
        name: true,
        surname: true,
        password: false,
        role: true,
        authProvider: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    return newUser;

  } catch (error) {
    logger.error("Error en el servicio:", error);
    throw error;
  }

}

