const ErrorResponse = require("../utilities/Error");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  
  if(err.name === "SyntaxError"){
    const message = "Invalid JSON payload passed."
    error = new ErrorResponse(message, 400)
  }
  res.status(error.statusCode || 500).json({
    "message": error.message,
    "status": "error",
    "data": null
  });
  
};

module.exports = errorHandler;