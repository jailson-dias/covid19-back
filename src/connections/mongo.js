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

const db = mongoose.connection;

db.on("error", err => {
  logger.error(`Error connecting on database: ${err}`);
  process.exit(1);
});

db.once("open", () => {
  logger.info("Mongo successfully connected");
});

export default db;
