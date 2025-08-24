const jwt = require("jsonwebtoken");
const { blackListToken } = require("../controllers/auth"); // import it

const authMiddleware = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token" });
    }

    token = token.split(" ")[1];

  
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = authMiddleware;
