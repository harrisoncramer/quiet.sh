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

export default {
  createSession,
  destroySession,
  createCookieFromSession,
  expireCookie,
};
