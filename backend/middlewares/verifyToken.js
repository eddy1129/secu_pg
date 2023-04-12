const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  // Get the authorization header
  const authHeader = req.headers["authorization"];
  
  // Get the token if authHeader exists
  const token = authHeader && authHeader.split(" ")[1];
  
  // If the token does not exists, send back "unauthorized" response
  if (token == null) return res.sendStatus(401);
  
  // Check if the token is signed
  jwt.verify(token, JWT_SECRET, (err, user) => {
    // If not signed, send back error response
    if (err) return res.sendStatus(403);
    // We can also manipulate the request with a middleware function
    req.user = user;
    // If signed, verficiation is successful,
    // proceed to the controller function
    next();
  });
};

module.exports = verifyToken;
