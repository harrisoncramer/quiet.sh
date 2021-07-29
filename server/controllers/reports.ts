import db from "../db";
import { RequestHandler } from "express";

const createReport: RequestHandler = async (req, res, next) => {
  try {
    const { searchResult } = res.locals;
    // Calculate metrics based on Github API response
    let exposed_count = 0;
    const exposed_files: string[] = [];
    for (const result of searchResult) {
      exposed_count += result.total_count;
      result.items.forEach((item: { html_url: string }) =>
        exposed_files.push(item.html_url)
      );
    }

    // Set exposed files to be saved into separate table...
    res.locals.exposed_files = exposed_files;

    const is_exposed = exposed_count > 0;

    // Get information about query from locals...
    const { repo, secrets } = req.body;
    const { user_id } = req.cookies;
    const { id, description, full_name, html_url } = repo;
    const query = `INSERT INTO reports (repo_id, description, full_name, html_url, user_id, is_gitleaks, number_of_secrets, time_of_execution, exposed_count, is_exposed) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING report_id`;

    const params = [
      id,
      description,
      full_name,
      html_url,
      user_id,
      true, // Set based on checkmark....
      secrets.length,
      new Date(), // Date of executed report...
      exposed_count,
      is_exposed,
    ];

    const { rows } = await db.query(query, params);
    res.locals.report_id = rows[0].report_id;
    return next();
  } catch (err) {
    console.log("FAILED TO SAVE REPORT TO DB: ", err.message);
    return next({ status: 500, message: "Failed to save user to database." });
  }
};

const getReports: RequestHandler = async (req, res, next) => {
  try {
    const { user_id } = req.cookies;
    const query = `SELECT * FROM reports WHERE reports.user_id=$1 ORDER BY time_of_execution DESC`;
    const { rows } = await db.query(query, [user_id]);
    res.locals.reports = rows;
    return next();
  } catch (err) {
    return next({ status: 500, message: "Unable to get reports for user." });
  }
};

const deleteReport: RequestHandler = async (req, _res, next) => {
  const { report_id } = req.body;
  const { user_id } = req.cookies;
  try {
    const query = `DELETE FROM exposures WHERE report_id=$1`;
    await db.query(query, [report_id]);
  } catch {
    return next({
      status: 500,
      message: "Unable to delete exposures assocaited with report.",
    });
  }
  try {
    // First delete any exposures associated with the report...
    const query = `DELETE FROM reports WHERE report_id=$1 AND user_id=$2`;
    await db.query(query, [report_id, user_id]);
    return next();
  } catch (err) {
    return next({ status: 500, message: "Unable to delete report." });
  }
};

export default {
  createReport,
  getReports,
  deleteReport,
};
