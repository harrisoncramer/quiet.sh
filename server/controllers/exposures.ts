import db from "../db";
import { RequestHandler } from "express";

const createExposures: RequestHandler = async (req, res, next) => {
  try {
    const { exposed_files } = res.locals; // Array of exposed files.
    const { user_id } = req.cookies;
    const { report_id } = res.locals;
    const repo_id = req.body.repo.id;
    const query = `INSERT INTO exposures (user_id, repo_id, report_id, url) VALUES ($1, $2, $3, $4)`;
    for (const exposure of exposed_files) {
      const params = [user_id, repo_id, report_id, exposure];
      await db.query(query, params);
    }

    return next();
  } catch (err) {
    console.log("FAILED TO SAVE EXPOSURE TO DB: ", err.message);
    return next({
      status: 500,
      message: "Failed to save exposure to database.",
    });
  }
  return next();
};

export default {
  createExposures,
};
