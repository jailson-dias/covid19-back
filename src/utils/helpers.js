import logger from "./logger";

export const responseGenerate = ({ message = [], notice = [], data = {} }) => {
  return {
    message,
    notice,
    data
  };
};

export const validationErrors = errors => {
  const fields = Object.keys(errors);
  logger.info(`ValidationError on fields: ${fields.join(", ")}`);

  return fields.map(key => ({
    field: key,
    message: errors[key].message
  }));
};
