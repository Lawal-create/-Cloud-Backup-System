import { NextFunction, Request, Response } from "express";
import { FileInstance } from "../models/File";
import { IFileRepository } from "../repository/FileRepository";
import { IAdminRepository } from "../repository/AdminRepository";
import { successResponse } from "../utils/responses";
import formatLog from "../utils/logger/formatLog";
import logger from "../utils/logger";

class AdminService {
  adminRepository: IAdminRepository<FileInstance>;
  fileRepository: IFileRepository<FileInstance>;

  constructor(
    adminRepository: IAdminRepository<FileInstance>,
    fileRepository: IFileRepository<FileInstance>
  ) {
    this.adminRepository = adminRepository;
    this.fileRepository = fileRepository;
  }

  markFiles = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      logger.info(formatLog(req, "Marking Files As Unsafe"));
      const { keys } = req.body;
      await this.adminRepository.update({ status: "unsafe" } as FileInstance, {
        where: { key: keys as string[] }
      });
      logger.info(formatLog(req, "Successfully marked files as unsafe "));
      return successResponse(
        res,
        200,
        "Successfully marked files as unsafe",
        null
      );
    } catch (err) {
      next(err);
    }
  };
  fetchAllFiles = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      logger.info(formatLog(req, "Fetching All Files"));
      const files = await this.fileRepository.findAll();
      logger.info(formatLog(req, "Successfully fetched all files "));
      return successResponse(res, 200, "Successfully fetched all files", files);
    } catch (err) {
      next(err);
    }
  };
}

export default AdminService;
