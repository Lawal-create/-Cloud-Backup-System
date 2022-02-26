import { NextFunction, Request, Response } from "express";
import { FileInstance } from "../models/File";
import { IFileRepository } from "../repository/FileRepository";
import { successResponse } from "../utils/responses";
import ApiError from "../errorHandler/ApiError";
import formatLog from "../utils/logger/formatLog";
import logger from "../utils/logger";
import { UploadFile, MulterFile } from "../types/global";
import { downloadSingleFile } from "../utils/aws";
class FileService {
  fileRepository: IFileRepository<FileInstance>;

  constructor(fileRepository: IFileRepository<FileInstance>) {
    this.fileRepository = fileRepository;
  }
  uploadSingleFile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      logger.info(formatLog(req, "START: Uploading a single file"));
      const userId = Number(res.locals.user.id);
      if ((req.file as Express.Multer.File).fieldname === "file") {
        const files = req.file as Express.Multer.File;
        const [location, key, originalname] = [
          (files as UploadFile).location,
          (files as UploadFile).key,
          (files as UploadFile).originalname
        ];
        const file = await this.fileRepository.create({
          userId: userId,
          location: location,
          key: key,
          filename: originalname
        } as FileInstance);

        logger.info(formatLog(req, "END: Successfully Uploaded The File"));
        return successResponse(
          res,
          200,
          "Successfully Uploaded the File",
          file.toJSON()
        );
      }
    } catch (err) {
      next(err);
    }
  };

  downloadSingleFile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      logger.info(formatLog(req, "START: Downloading a single file"));
      const { fileKey } = req.query;
      const file = await this.fileRepository.findOne({
        where: { key: String(fileKey) }
      });
      if (!file) return next(new ApiError(401, "No file with key found"));

      await downloadSingleFile(req, res, String(fileKey));
    } catch (err) {
      next(err);
    }
  };
  uploadMultipleFiles = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      logger.info(formatLog(req, "START: Uploading Multiple Files"));
      const userId = Number(res.locals.user.id);
      const FileArray = [];
      if (req.files as MulterFile) {
        const files = (req.files as MulterFile)?.files;
        if (files) {
          for (let i = 0; i < files.length; i++) {
            const [location, key, originalname] = [
              (files[i] as UploadFile).location,
              (files[i] as UploadFile).key,
              (files[i] as UploadFile).originalname
            ];
            const file = {
              userId: userId,
              location: location,
              key: key,
              filename: originalname
            } as FileInstance;

            FileArray.push(file);
          }
        }
      }
      const multiFiles = await this.fileRepository.bulkCreate(FileArray);
      return successResponse(
        res,
        200,
        "Successfully created multiple files",
        multiFiles
      );
    } catch (err) {
      next(err);
    }
  };
}
export default FileService;
