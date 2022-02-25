import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || "3000";
const nodeEnv = process.env.NODE_ENV || "development";
const dbName = process.env.DB_NAME || "";
const dbUsername = process.env.DB_USERNAME || "";
const dbPassword = process.env.DB_PASSWORD || "";
const dbDialect = process.env.DB_DIALECT || "";
const dbHost = process.env.DB_HOST || "";
const jwtSecret = process.env.JWT_SECRET || "";
const jwtExpiresIn = Number(process.env.JWT_EXPIRES_IN) || "";
const bcryptSalt = Number(process.env.BCRYPT_SALT) || "";
const awsID = process.env.AWS_ACCESS_ID || "";
const awsKey = process.env.AWS_ACCESS_KEY || "";
const awsBucket = process.env.AWS_BUCKET_NAME || "";
const cronJobSchedule = process.env.CRON_JOB_SCHEDULE || "";
export = {
  port,
  nodeEnv,
  dbName,
  dbUsername,
  dbPassword,
  dbDialect,
  dbHost,
  jwtExpiresIn,
  jwtSecret,
  bcryptSalt,
  awsID,
  awsKey,
  awsBucket,
  cronJobSchedule
};
