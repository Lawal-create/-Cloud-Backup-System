import http from "http";
import app from "./app";
import config from "./env.config";
import logger from "./utils/logger";
import { connectToDB } from "./database/connect";

const { port, nodeEnv } = config;

const server = http.createServer(app);

//function to ensure database connects before server starts.
const startServer = async (): Promise<void> => {
  await connectToDB();
  server.listen(port, () => {
    if (nodeEnv !== "test") {
      logger.info(`
        ################################################
        🛡️  Server listening on port: ${port} 🛡️
        ################################################
        SERVER IN ${nodeEnv as string} MODE
      `);
    }
  });
};

startServer();
