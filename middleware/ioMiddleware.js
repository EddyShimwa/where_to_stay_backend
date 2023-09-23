const ioMiddleware = (io) => (req, res, next) => {
    req.io = io;
    next();
  };
  
module.exports = ioMiddleware;
  