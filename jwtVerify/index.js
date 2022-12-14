const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  const token = req.headers.auth;
  if (!token) return res.status(400).send("Access Denied");
  try {
    const decode = jwt.verify(token, process.env.SECRET);
    req.user = decode;
    next();
  } catch (err) {
    res.status(400).send("Authentication Failed");
  }
};
