import db from "../db";
import { RequestHandler } from "express";
// import bcrypt from "bcryptjs";

const createCookieFromToken: RequestHandler = (_req, res, next) => {
  const { token } = res.locals;

  res.cookie("ssid", token, {
    expires: new Date(Date.now() + 1200000),
    httpOnly: true,
  });

  res.cookie("loggedIn", true, {
    expires: new Date(Date.now() + 1200000),
    httpOnly: false,
  });

  next();
};

const saveUser: RequestHandler = async (_req, res, next) => {
  const { accountInfo } = res.locals;
  const { avatar_url, id, login, repos_url } = accountInfo;
  const query = `INSERT INTO users (avatar_url, github_id, login, repos_url) VALUES ($1, $2, $3, $4) ON CONFLICT (github_id) DO NOTHING; `; // PSQL Save Query...
  try {
    await db.query(query, [avatar_url, id, login, repos_url]);
    return next();
  } catch (err) {
    console.log("FAILED TO SAVE USER TO DB: ", err.message);
    next({ status: 500, message: "Failed to save user to database." });
  }
};

const updateToken: RequestHandler = async (_req, res, next) => {
  const { accountInfo } = res.locals;
  const { token } = res.locals;
  const { id } = accountInfo;
  const query = `UPDATE users SET token = $1 WHERE github_id = $2`; // PSQL Save Query...
  try {
    await db.query(query, [token, id]);
    return next();
  } catch (err) {
    console.log("FAILED TO SAVE TOKEN TO DB: ", err.message);
    next({ status: 500, message: "Failed to save token to database." });
  }
};

const destroyToken: RequestHandler = async (req, res, next) => {
  const { ssid } = req.cookies; // Grab the cookie (which is the Github token)
  const query = `UPDATE users SET token = NULL WHERE token=$1`;
  console.log("SSID IS ", ssid);
  try {
    await db.query(query, [ssid]);
    return next();
  } catch (err) {
    console.log("UNABLE TO DESTROY TOKEN FOR USER: ", err.message);
    next({ status: 500, message: "Failed to destroy token for user." });
  }
  next();
};

const expireCookie: RequestHandler = (_req, res, next) => {
  res.cookie("loggedIn", "", { maxAge: 0 });
  res.cookie("ssid", "", { maxAge: 0 });
  next();
};

const getInfo: RequestHandler = (req, res, next) => {
  const { token } = req.body;
  console.log(token);
  const query = `SELECT * FROM users WHERE users.token=$1`;
  next();
};

// const createSession: RequestHandler = (_req, res, next) => {
//   const { token } = res.locals;
//   const salt = bcrypt.genSaltSync(8);
//   const hashedToken = bcrypt.hashSync(token, salt);
//   res.locals.hashedToken = hashedToken;
//   return next();
// };

export default {
  // createSession,
  createCookieFromToken,
  saveUser,
  updateToken,
  destroyToken,
  expireCookie,
  getInfo,
};
