import db from "../db";
import { RequestHandler } from "express";

// Creates a report in the DB, checking the sensitive info against
// the master branch and running various helper repositories.
const createReport: RequestHandler = async (req, res, next) => {
  try {
    const { repo, secrets } = req.body;
    const { user_id } = req.cookies;
    const { id, description, full_name, html_url } = repo;
    const query = `INSERT INTO reports (id, description, full_name, html_url, user_id, is_gitleaks, number_of_secrets, time_of_execution) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
    const params = [
      id,
      description,
      full_name,
      html_url,
      user_id,
      true, // Set based on checkmark....
      secrets.length,
      new Date(), // Date of executed report...
    ];
    const { rows } = await db.query(query, params);
    res.locals.report = rows;
    return next();
  } catch (err) {
    console.log("FAILED TO SAVE USER TO DB: ", err.message);
    return next({ status: 500, message: "Failed to save user to database." });
  }
};

const getReports: RequestHandler = async (req, res, next) => {
  try {
    const { user_id } = req.cookies;
    const query = `SELECT * FROM reports WHERE reports.user_id=$1`;
    const { rows } = await db.query(query, [user_id]);
    res.locals.reports = rows;
    return next();
  } catch (err) {
    return next({ status: 500, message: "Unable to get reports for user." });
  }
};

export default {
  createReport,
  getReports,
};
