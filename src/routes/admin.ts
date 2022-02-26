import express, { Router } from "express";
import requiresSignIn from "../middlewares/auth/requiresSignIn";
import requiresAdmin from "../middlewares/auth/requiresAdmin";
import joiMiddleware from "../middlewares/joiMiddleware";
import { adminValidator } from "../validators/adminValidator";
import { adminService } from "../di/serviceLocator";

const adminRoutes: Router = express.Router();

/**
 * @routes Admin Routes
 */
adminRoutes.use(requiresSignIn, requiresAdmin("admin"));

adminRoutes.put(
  "/markFiles",
  joiMiddleware(adminValidator),
  adminService.markFiles
);

adminRoutes.get("/fetchFiles", adminService.fetchAllFiles);

export default adminRoutes;
