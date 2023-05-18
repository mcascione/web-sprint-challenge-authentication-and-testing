const db = require("../../data/dbConfig");

const checkUsernameExists = async (req, res, next) => {
  try {
    const user = await db("users").where("username", req.body.username).first();
    if (!user) {
      req.user = user;
      next();
    } else {
      next({ status: 400, message: "username taken" });
    }
  } catch (err) {
    next(err);
  }
};

const validateReq = (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    next({ status: 400, message: "username and password required" });
  } else {
    next();
  }
};

module.exports = {
  checkUsernameExists,
  validateReq
};
