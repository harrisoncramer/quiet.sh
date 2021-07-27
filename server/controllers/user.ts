import db from "../db";
import { QueryResult } from "pg";
import { RequestHandler } from "express";
import axios from "axios";

// Create a sesion from the Github token
const createSession: RequestHandler = (_req, res, next) => {
  const { token } = res.locals;
  console.log("TOKEN IS: ", token);
  return next();
};

// Destroy the user's current session
const destroySession: RequestHandler = (req, res, next) => {};

export default { createSession, destroySession };
