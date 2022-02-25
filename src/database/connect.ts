import { Dialect, Sequelize } from "sequelize";
import config from "../env.config";
import logger from "../utils/logger";

const { dbName, dbUsername, dbPassword, dbDialect, dbHost, nodeEnv } = config;

const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  dialect: dbDialect as Dialect,
  port: 5432
});

// if (nodeEnv === "production") {
//   sequelize = new Sequelize(process.env.DATABASE_URL as string);
// }

const connectToDB = async (): Promise<void> => {
  try {
    logger.info("Database is connecting");
    await sequelize.authenticate();
    await sequelize.sync();
    logger.info("Database connection has been established successfully.");
  } catch (error) {
    logger.error("Unable to connect to the database due to: ", error);
  }
};
export { sequelize, connectToDB };
