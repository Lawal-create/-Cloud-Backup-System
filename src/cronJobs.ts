import * as cron from "node-cron";
import config from "./env.config";
import File from "./models/File";
import logger from "./utils/logger";
import { deleteMultipleFiles } from "./utils/aws";

const { cronJobSchedule } = config;
const deleteFiles = async () => {
  logger.info("Deleting unsafe files");
  const files = await File.findAll({ where: { status: "unsafe" } });
  const fileKeys = [];
  if (files.length > 0) {
    for (const file of files) {
      fileKeys.push({ Key: file.key });
    }
    deleteMultipleFiles(fileKeys);
    await File.destroy({ where: { status: "unsafe" } });
    logger.info("Successfully deleted all unsafe files");
  }
};

const cronJobs = cron.schedule(cronJobSchedule, async () => {
  logger.info("Running cron jobs");

  await deleteFiles();
  logger.info("Cron jobs run successfully");
});

export default cronJobs;
