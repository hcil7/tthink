const User = require("../model/Users");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];

  try {
    const jws = "/B?E(G+KbPeShVmYq3t6w9z$C&F)J@Mc";
    const payload = jwt.verify(token, jws);
    // attach the user to the job routes
    console.log(payload);
    req.user = {
      userId: payload.userId,
    };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

module.exports = auth;
