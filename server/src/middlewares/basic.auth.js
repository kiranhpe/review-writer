const basicAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const credsEncoded = authHeader.split(" ")[1];
    const credsDecoded = Buffer.from(credsEncoded, "base64")
      .toString("ascii")
      .split(":");

    if (credsDecoded[0] === "Kiran" && credsDecoded[1] === "Qwerty") {
      next();
    } else {
      res.status(401).send('You are not authorized');
    }
  } else {
    res.status(401).send('You are not authorized');
  }
};

module.exports = basicAuth;
