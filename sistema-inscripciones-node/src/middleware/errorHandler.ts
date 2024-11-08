import type { Request, Response, NextFunction } from 'express';
import httpStatusCodes from '@/helpers/httpStatus';
import logger from "@/utils/winston";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CustomError } from '@/utils/errorCustomer';

function handleCustomError(err: CustomError, res: Response) {
    return res.status(err.statusCode).json({ message: err.message });
}

function handlePrismaError(err: PrismaClientKnownRequestError, res: Response) {
    switch (err.code) {
        case 'P2002':
            return res.status(httpStatusCodes.CONFLICT).json({ message: 'El correo electrónico ya está registrado' });
        case 'P2010':
        case err.message.includes('Server selection timeout') && 'Server selection timeout':
            return res.status(httpStatusCodes.SERVICE_UNAVAILABLE).json({
                message: 'El servicio de base de datos no está disponible en este momento. Por favor, inténtelo de nuevo más tarde.',
            });
        default:
            return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'An unexpected error occurred with the database',
                error: err.message,
            });
    }
}

function handleAuthError(err: Error, res: Response) {
    if (err.message === 'Token missing or invalid') {
        return res.status(httpStatusCodes.UNAUTHORIZED).json({ message: err.message });
    }

    if (err.message === 'El correo electrónico ya está registrado') {
        return res.status(httpStatusCodes.CONFLICT).json({ message: err.message });
    }

    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'An unexpected authentication error occurred',
        error: err.message,
    });
}

export const errorHandler = (err: Error, _req: Request, res: Response, next: NextFunction) => {
    logger.error("errores globales", err);

    if (res.headersSent) {
        return next(err);
    }

    if (err instanceof CustomError) {
        return handleCustomError(err, res);
    }

    if (err instanceof PrismaClientKnownRequestError) {
        return handlePrismaError(err, res);
    }

    if (err.message === 'Token missing or invalid' || err.message === 'El correo electrónico ya está registrado') {
        return handleAuthError(err, res);
    }

    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'An unexpected error occurred',
        error: err.message,
    });
}