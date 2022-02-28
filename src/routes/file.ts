import express, { Router } from "express";
import { fileService } from "../di/serviceLocator";
import upload from "../utils/aws";
import requiresSignIn from "../middlewares/auth/requiresSignIn";

const fileRoutes: Router = express.Router();

/**
 * @routes Media Routes
 */
fileRoutes.post(
  "/upload",
  requiresSignIn,
  upload.single("file"),
  fileService.uploadSingleFile
);

fileRoutes.post(
  "/upload-multiple",
  requiresSignIn,
  upload.fields([{ name: "files", maxCount: 10 }]),
  fileService.uploadMultipleFiles
);
fileRoutes.get("/download", requiresSignIn, fileService.downloadSingleFile);

fileRoutes.get(
  "/fetchStreamingLink",
  requiresSignIn,
  fileService.streamMediaFiles
);

fileRoutes.get(
  "/fetchUploadedFiles",
  requiresSignIn,
  fileService.fetchUploadedFiles
);

export default fileRoutes;
