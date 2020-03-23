import Express from "express";
import cors from "cors";
import * as settings from "./settings";
import logger from "./utils/logger";
import posts from "./routes/post";
import bodyParser from "body-parser";
import "./connections/mongo";

const app = Express();

app.use(cors());
app.use(bodyParser.json());

// Desativa o X-Powered-By: Express
app.disable("x-powered-by");

app.use("/posts/v1", posts);

app.listen(settings.SERVICE_PORT, settings.SERVICE_HOST, () => {
  logger.info(`Listening on port ${settings.SERVICE_PORT}...`);
});
