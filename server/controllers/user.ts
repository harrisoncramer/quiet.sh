import db from "../db";
import { QueryResult } from "pg";
import { RequestHandler } from "express";
import axios from "axios";

// Create a sesion from the Github token
const createSession: RequestHandler = (_req, res, next) => {
  const { token } = res.locals;
  // HASH THE TOKEN, AND SAVE A SESSION IN THE DB
  // THEN, ATTACH THAT HASHED SESSION ID TO OUR LOCALS OBJECT
  res.locals.hashedSessionId = token; // CHANGE THIS!
  return next();
};

// Destroy the user's current session
const destroySession: RequestHandler = (req, res, next) => {
  const { hashedSessionId } = res.locals;
  // DESTROY THE SESSION
  next();
};

const expireCookie: RequestHandler = (req, res, next) => {
  res.cookie("loggedIn", "", { maxAge: 0 });
  res.cookie("ssid", "", { maxAge: 0 });
  next();
};

const createCookieFromSession: RequestHandler = (req, res, next) => {
  const { hashedSessionId } = res.locals;

  // Make SSID cookie server-side only
  res.cookie("ssid", hashedSessionId, {
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

const updateToken: RequestHandler = async (req, res, next) => {
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

export default {
  createSession,
  destroySession,
  createCookieFromSession,
  expireCookie,
  saveUser,
  updateToken,
};
