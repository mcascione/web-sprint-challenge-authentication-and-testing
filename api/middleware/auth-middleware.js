const db = require("../../data/dbConfig");

const checkUsernameDoesNotExist = async (req, res, next) => {
  try {
    const user = await db("users").where("username", req.body.username).first();
    if (!user) {
      req.user = {
        password: req.body.password,
        username: req.body.username,
      };
      next();
    } else {
      next({ status: 400, message: "username taken" });
    }
  } catch (err) {
    next(err);
  }
};

const checkUsernameExists = async (req, res, next) => {
  try {
    const user = await db("users").where("username", req.body.username).first();
    if (user) {
      req.user = {
        password: user.password,
        username: user.username,
      };
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
  validateReq,
  checkUsernameDoesNotExist,
};
