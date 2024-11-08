import type { Request, Response, NextFunction } from "express"
import prisma from "@/libs/prisma"
import { UserRole } from "@prisma/client"
import httpStatusCodes from "@/helpers/httpStatus"
import { encrypt } from "@/utils/bcrypt"
interface DeleteSelectionRequest extends Request {
        body: {
                selectionsIds: string[];
        },
}

export const CreateMentor = async (req: Request, res: Response, next: NextFunction) => {
        const { name, email, password, surname } = req.body
        try {
                const hassPassword = encrypt(password)
                const user = await prisma.user.create({
                        data: {
                                name,
                                surname,
                                email,
                                password: hassPassword,
                                role: UserRole.MENTOR,
                        },
                        select: {
                                name: true,
                                surname: true,
                                email: true,
                                role: true,
                                password: false
                        }
                })
                return res.status(httpStatusCodes.CREATED).json({
                        message: "usuario creado",
                        succes: true,
                        user: user
                })
        } catch (error) {
                next(error)
        } finally {
                prisma.$disconnect
        }
}

export const getAllMentor = async (_req: Request, res: Response, next: NextFunction) => {
        try {
                const mentor = await prisma.user.findMany({
                        where: {
                                role: UserRole.MENTOR
                        },
                        select: {
                                id: true,
                                name: true,
                                surname: true,
                                email: true,
                                role: true,
                                password: false,
                        }
                })
                return res.status(httpStatusCodes.OK).json({
                        message: "todos los mentores",
                        succes: true,
                        mentor: mentor
                })
        } catch (error) {
                next(error)
        } finally {
                prisma.$disconnect
        }
}

export const getOneMentor = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        try {
                const mentor = await prisma.user.findUnique({
                        where: {
                                id: id,
                        },
                        select: {
                                id: true,
                                name: true,
                                surname: true,
                                email: true,
                                role: true,
                                password: false,
                        }
                })
                return res.status(httpStatusCodes.OK).json({
                        message: "mentor encontrado",
                        succes: true,
                        mentor: mentor
                })
        } catch (error) {
                next(error)
        } finally {
                prisma.$disconnect
        }
}

export const updatedMentor = async (req: Request, res: Response, next: NextFunction) => {
        const { name, password, email, surname, role } = req.body;
        const { id } = req.params;

        if (!req.body) {
                return res.status(httpStatusCodes.BAD_REQUEST).json({
                        message: "Todos los campos son requeridos",
                        success: false,
                });
        }

        try {
                const mentor = await prisma.user.update({
                        where: {
                                id: id,
                        },
                        data: {
                                email: email,
                                name,
                                surname,
                                password: encrypt(password),
                                role: role,
                        },
                        select: {
                                id: true,
                                name: true,
                                email: true,
                                password: false,
                                role: true,
                        },
                });

                return res.status(httpStatusCodes.OK).json({
                        message: "Mentor actualizado",
                        success: true,
                        mentor: mentor,
                });
        } catch (error) {
                console.error("Error al actualizar mentor:", error);
                return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
                        message: "Error al actualizar mentor",
                        success: false,
                });
        } finally {
                await prisma.$disconnect();
        }
}

export const deleteMentorById = async (req: Request, res: Response, next: NextFunction) => {
        try {
                const { id } = req.params;

                const mentor = await prisma.user.findUnique({
                        where: { id },
                });

                if (!mentor) {
                        return res.status(httpStatusCodes.NOT_FOUND).json({
                                message: 'Mentor not found',
                                success: false,
                        });
                }

                await prisma.user.delete({
                        where: { id },
                });

                return res.status(httpStatusCodes.OK).json({
                        message: 'Mentor deleted successfully',
                        success: true,
                });
        } catch (error) {
                next(error);
        } finally {
                await prisma.$disconnect();
        }
};

export const deleteMentors = async (req: DeleteSelectionRequest, res: Response, next: NextFunction) => {
        try {
                const { selectionsIds, } = req.body;

                if (selectionsIds.length === 0) {
                        return res.status(httpStatusCodes.NOT_FOUND).json({
                                message: 'No selection mentor',
                                success: false,
                        });
                }

                const deletedMentors = await prisma.user.deleteMany({
                        where: {
                                id: { in: selectionsIds },
                        },
                });


                return res.status(httpStatusCodes.OK).json({
                        message: `${deletedMentors.count} mentor(s) deleted successfully`,
                        success: true,
                });
        } catch (error) {
                next(error);
        } finally {
                await prisma.$disconnect();
        }
}


export const createCurso = async (req: Request, res: Response, next: NextFunction) => {
        const { title, description, tags, linkVideo, mentorID } = req.body
        if (!title || !description || !tags || !linkVideo || mentorID) {
                return res.status(httpStatusCodes.BAD_REQUEST).json({
                        message: "faltan datos",
                        succes: false
                })
        }
        try {
                const curso = await prisma.course.create({
                        data: {
                                title: title,
                                description: description,
                                tags: tags,
                                linkVideo: linkVideo,
                        },
                        select: {
                                title: true,
                                description: true,
                                tags: true,
                                linkVideo: true,
                        }
                })
                return res.status(httpStatusCodes.CREATED).json({
                        message: "curso creado",
                        succes: true,
                        curso: curso
                })

        } catch (error) {
                next(error)
        }
}

export const getAllCurso = async (_req: Request, res: Response, next: NextFunction) => {
        try {
                const curso = await prisma.course.findMany()
                return res.status(httpStatusCodes.OK).json({
                        message: "todos los cursos",
                        succes: true,
                        curso: curso
                })
        } catch (error) {
                next(error)
        } finally {
                prisma.$disconnect
        }
}

export const getOneCurso = async (req: Request, res: Response, next: NextFunction) => {
        try {
                const curso = await prisma.course.findUnique({
                        where: {
                                id: req.params.id
                        }
                })
                return res.status(httpStatusCodes.OK).json({
                        message: "curso encontrado",
                        succes: true,
                        curso: curso
                })
        } catch (error) {
                next(error)
        } finally {
                prisma.$disconnect
        }
}

export const updatedCurso = async (req: Request, res: Response, next: NextFunction) => {
        const { title, description, tags, linkVideo, mentorId } = req.body
        const { id } = req.params
        if (!title || !description || !tags || !linkVideo || !mentorId) {
                return res.status(httpStatusCodes.BAD_REQUEST).json({
                        message: "faltan datos",
                        succes: false
                })
        }
        try {
                const curso = await prisma.course.update({
                        where: {
                                id: id
                        },
                        data: {
                                title: title,
                                description: description,
                                tags: tags,
                                linkVideo: linkVideo,
                                mentorId: mentorId
                        },
                        select: {
                                title: true,
                                description: true,
                                tags: true,
                                linkVideo: true,
                                mentorId: true
                        }

                })
                return res.status(httpStatusCodes.OK).json({
                        message: "curso actualizado",
                        succes: true,
                        curso: curso
                })
        } catch (error) {
                next(error)
        } finally {
                prisma.$disconnect
        }
}

export const deletedCurse = async (req: DeleteSelectionRequest, res: Response, next: NextFunction) => {
        try {
                const { selectionsIds } = req.body;

                if (!selectionsIds.length) {
                        return res.status(400).json({
                                message: 'No curse IDs',
                                success: false,
                        });
                }

                const deletedCurse = await prisma.course.deleteMany({
                        where: {
                                id: { in: selectionsIds },
                        },
                });

                return res.status(200).json({
                        message: deletedCurse.count > 1 ? `curses ${deletedCurse.count} deleted` : "curse deleted",
                        success: true,
                });
        } catch (error) {
                next(error);
        } finally {
                await prisma.$disconnect();
        }
}

export const getAllStudent = async (_req: Request, res: Response, next: NextFunction) => {
        try {
                const students = await prisma.user.findMany({
                        where: {
                                role: UserRole.STUDENT
                        },
                        select: {
                                id: true,
                                name: true,
                                surname: true,
                                email: true,
                                role: true,
                                password: false,
                        }
                })
                return res.status(httpStatusCodes.OK).json({
                        message: "todos los Student",
                        succes: true,
                        students: students
                })
        } catch (error) {
                next(error)
        } finally {
                prisma.$disconnect
        }
}

export const getOneStudent = async (req: Request, res: Response, next: NextFunction) => {
        try {
                const student = await prisma.user.findUnique({
                        where: {
                                id: req.params.id,
                                role: UserRole.STUDENT
                        },
                        select: {
                                id: true,
                                name: true,
                                surname: true,
                                email: true,
                                role: true,
                                password: false,
                        }
                })
                return res.status(httpStatusCodes.OK).json({
                        message: "student no encontrado",
                        succes: true,
                        student: student
                })
        } catch (error) {
                next(error)
        } finally {
                prisma.$disconnect
        }
}

export const createStudent = async (req: Request, res: Response, next: NextFunction) => {
        const { name, email, password, surname, role } = req.body
        try {
                const student = await prisma.user.create({
                        data: {
                                name,
                                surname,
                                email,
                                password: encrypt(password),
                                role,
                        },
                        select: {
                                name: true,
                                surname: true,
                                email: true,
                                role: true,
                                password: false,
                        }
                })
                return res.status(httpStatusCodes.CREATED).json({
                        message: "student creado",
                        succes: true,
                        student: student
                })
        } catch (error) {
                next(error)
        } finally {
                prisma.$disconnect
        }
}

export const updatedStudent = async (req: Request, res: Response, next: NextFunction) => {
        const { name, password, email, surname } = req.body
        const { id } = req.params
        try {
                const student = await prisma.user.update({
                        where: {
                                id: id
                        },
                        data: {
                                name,
                                surname,
                                password: encrypt(password),
                                email
                        },
                        omit: {
                                password: true
                        }
                })
                return res.status(httpStatusCodes.OK).json({
                        message: "student actualizado",
                        succes: true,
                        student: student
                })
        } catch (error) {
                next(error)
        } finally {
                prisma.$disconnect
        }
}

export const deletedStudenById = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        try {
                const existStudent = await prisma.user.findUnique({ where: { id: id } })
                if (!existStudent) {
                        return res.status(httpStatusCodes.NOT_FOUND).json({ message: "student no encontrado" })
                }

                const student = await prisma.user.delete({
                        where: {
                                id: id
                        }
                })
                return res.status(httpStatusCodes.OK).json({
                        message: "student eliminado",
                        succes: true,
                        student: student
                })

        } catch (error) {
                next(error);
        } finally {
                await prisma.$disconnect();
        }
}