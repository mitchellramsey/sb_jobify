const errorHandlerMiddleware = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    msg: 'There was an error',
  });
};

export default errorHandlerMiddleware;
