import express from "express";
import router from "./routes";
import errorHandler from "./errorHandler";
import notFound from "./middlewares/notFound";
import cors from "cors";
// import cookieParser from "cookie-parser";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/v1", router);

app.use("*", notFound);

app.use(errorHandler);

export default app;
