import express, { Router } from "express";
import adminRoutes from "./admin";
import authRoutes from "./auth";
import fileRoutes from "./file";
const router: Router = express.Router();

router.use("/auth", authRoutes);
router.use("/file", fileRoutes);
router.use("/admin", adminRoutes);

export default router;
