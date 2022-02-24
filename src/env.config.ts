import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || "3000";
const nodeEnv = process.env.NODE_ENV || "development";

export { port, nodeEnv };
