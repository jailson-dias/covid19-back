export const responseGenerate = ({ message = [], notice = [], data = {} }) => {
  return {
    message,
    notice,
    data
  };
};
