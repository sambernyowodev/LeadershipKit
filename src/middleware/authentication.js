const jwt = require("jsonwebtoken");
const logger = require("./logger");
const secret = process.env.JWT_SECRET;

function authenticate(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    logger.error("Authorization header missing");
    // Log the error using your logger
    return res.status(401).json({
      error: "Authorization header missing",
    });
  }

  try {
    const decodedToken = jwt.verify(token, secret);
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    logger.error("Invalid token", error);
    // Log the error using your logger
    return res.status(401).json({
      error: "Invalid token",
    });
  }
}

module.exports = { authenticate };
