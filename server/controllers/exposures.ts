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
};

const getExposures: RequestHandler = async (req, res, next) => {
  try {
    const { user_id, report_id } = req.body;
    const query = `SELECT exposures.url FROM exposures WHERE exposures.report_id=$1 AND exposures.user_id=$2;`; // JOIN QUERY TO GET ALL OF THE EXPOSURES
    const params = [report_id, user_id];
    const { rows } = await db.query(query, params);
    res.locals.exposures = rows;
    return next();
  } catch (err) {
    return next({
      status: 500,
      message: "Failed to get exposures for given user and repository",
    });
  }
};

export default {
  createExposures,
  getExposures,
};
