import { Router } from "express"
import { CreateMentor, getAllMentor, getOneMentor, updatedMentor, deleteMentors, deleteMentorById } from "@/controllers/adminController"
import { createCurso, deletedCurse, getOneCurso, updatedCurso, getAllCurso, } from "@/controllers/adminController"
import { createStudent, updatedStudent, deletedStudenById, getAllStudent, getOneStudent } from "@/controllers/adminController"

const adminRouter = Router()

adminRouter.route("/mentor")
    .get(getAllMentor)
    .post(CreateMentor)

adminRouter.route("/mentor/:id")
    .get(getOneMentor)
    .put(updatedMentor)
    .delete(deleteMentorById)

adminRouter.route("/mentor/delete-multiple")
    .delete(deleteMentors);

adminRouter.route("/course")
    .get(getAllCurso)
    .post(createCurso)

adminRouter.route("/course/:id")
    .get(getOneCurso)
    .put(updatedCurso)
    .delete(deletedCurse)
adminRouter.route("/student")
    .get(getAllStudent)
    .post(createStudent)

adminRouter.route("/student/:id")
    .get(getOneStudent)
    .put(updatedStudent)
    .delete(deletedStudenById)

export { adminRouter }