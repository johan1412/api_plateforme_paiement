const jwt = require("jsonwebtoken");


module.exports = function (req, res, next) {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access denied');
  try {
    // const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send('Invalid token');
  }
}


exports.verifJWT = function verifJWT(token) {
  return new Promise((res, rej) =>
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) rej(err);
      else res(decoded);
    })
  );
};

exports.createJWT = function createJWT(user) {
  return new Promise((res, rej) =>
    jwt.sign(
      user,
      process.env.JWT_SECRET,
      { algorithm: "HS512", expiresIn: 3600 },
      (err, decoded) => {
        if (err) rej(err);
        else res(decoded);
      }
    )
  );
};