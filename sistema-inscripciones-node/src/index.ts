import express from "express"
import authRoter from "@/routes/authUser"
import { validateTokenJWT, isAdmin } from "@/middleware/validateToken"
import { adminRouter } from "@/routes/adminRouter"
import { errorHandler } from "@/middleware/errorHandler"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}))

const PORT = process.env.PORT ?? 4000

// Rutas publicas
app.use('/api/v1/auth', authRoter);

// ruta para admin
app.use('/api/v1/admin', validateTokenJWT, isAdmin, adminRouter);

// ruta para estudiantes 
app.use('/api/v1/student', validateTokenJWT);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
