function sizeMiddleWare(req, res, next) {
  const contentType = req.headers["content-type"];
  if (contentType && contentType.indexOf("multipart/form-data") !== -1) {
    // Handle multipart/form-data requests separately, as their size cannot be easily determined here
    next();
  } else {
    const contentLength = parseInt(req.headers["content-length"], 10);
    console.log(contentLength);
    const limit = 1024 * 1024 * 25; // 25 MB limit
    if (contentLength && contentLength > limit) {
      res
        .status(400)
        .json({ custom: true, message: "Request body exceeds limit" });
    } else {
      next();
    }
  }
}

module.exports = sizeMiddleWare;
