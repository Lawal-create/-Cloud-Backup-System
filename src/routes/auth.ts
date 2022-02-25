import express, { Router } from "express";
import { authService } from "../di/serviceLocator";
import joiMiddleware from "../middlewares/joiMiddleware";
import { signupValidator, loginValidator } from "../validators/authValidator";

/**
 * @routes Authentication Routes
 */
const authRouter: Router = express.Router();
authRouter.post("/signup", joiMiddleware(signupValidator), authService.signup);
authRouter.post("/login", joiMiddleware(loginValidator), authService.login);

export default authRouter;
