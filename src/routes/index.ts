import express, { Router } from "express";
import authRoutes from "./auth";
import fileRoutes from "./file";
const router: Router = express.Router();

router.use("/auth", authRoutes);
router.use("/file", fileRoutes);

export default router;
