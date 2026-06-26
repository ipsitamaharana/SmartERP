const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
const token = req.headers.authorization;

if (!token) {
  return res.status(401).json({
    message: "Access denied. No token provided.",
  });
}
const jwtToken = token.split(" ")[1];
try {
  const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

  req.user = decoded;

  next();
} catch (error) {
  return res.status(401).json({
    message: "Invalid token",
  });
}
};

module.exports = protect;