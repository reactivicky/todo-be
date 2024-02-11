const CustomError = require("../utils/customError");

const errorHandler = (error, req, res, next) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).send(error.message);
  }

  return res.status(500).send(error.message);
};

module.exports = errorHandler;
