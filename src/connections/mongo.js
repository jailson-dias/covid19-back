import mongoose from "mongoose";
import { MONGO_URI } from "../settings";
import logger from "../utils/logger";

mongoose.connect(MONGO_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
});
mongoose.Promise = global.Promise;

const database = mongoose.connection;

database.on("error", err => {
  logger.error(`Error connecting on database: ${err}`);
  process.exit(1);
});

database.once("open", () => {
  logger.info("Mongo successfully connected");
});

export default database;
