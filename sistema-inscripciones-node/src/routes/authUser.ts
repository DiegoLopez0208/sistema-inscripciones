import { Router } from 'express';
import { loginUser, logoutUser, registerUser, refreshToken, googleLogin } from '@/controllers/login';
const authRouter = Router();

authRouter.route('/login')
    .post(loginUser);

authRouter.route('/register')
    .post(registerUser);

authRouter.route('/refreshCookie')
    .post(refreshToken);

authRouter.route('/logout')
    .post(logoutUser);

authRouter.route('/verifyGoogle')
    .post(googleLogin);

export default authRouter