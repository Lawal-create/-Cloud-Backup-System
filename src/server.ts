import http from "http";
import app from "./app";
import { nodeEnv, port } from "./env.config";

const server = http.createServer(app);

//function to ensure database connects before server starts.
const startServer = async (): Promise<void> => {
  server.listen(port, () => {
    if (nodeEnv !== "test") {
      console.log(`
        ################################################
        🛡️  Server listening on port: ${port} 🛡️
        ################################################
        SERVER IN ${nodeEnv as string} MODE
      `);
    }
  });
};

startServer();
