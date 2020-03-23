import Express from "express";
import cors from "cors";
import * as settings from "./settings";
import logger from "./utils/logger";

const app = Express();

// Cors
app.use(cors());

// Desativa o X-Powered-By: Express
app.disable("x-powered-by");

app.get("/teste", (req, res) => {
  res.send("Funcionando :)");
});

app.listen(settings.SERVICE_PORT, settings.SERVICE_HOST, () =>
  logger.info(`Listening on port ${settings.SERVICE_PORT}...`)
);
