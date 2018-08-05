function checkHeader (req, res, next) {
  // if (!req.headers.version || req.headers.version !== '1.0') {
  //   res.status(400).json({'error' : 'bad header'})
  // } else {
    next();
  // }
};

module.exports = {
  checkHeader
};