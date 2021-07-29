import express from "express";
import reports from "../controllers/reports";
import exposures from "../controllers/exposures";
import github from "../routers/routes/github";

const router = express.Router();

router.post(
  "/create",
  github.searchSecrets,
  reports.createReport,
  exposures.createExposures,
  (_req, res) => {
    res.status(200).send([]);
  }
);

router.get("/", reports.getReports, (_req, res) => {
  res.status(200).send(res.locals.reports);
});

router.delete("/", reports.deleteReport, reports.getReports, (_req, res) => {
  res.status(200).send(res.locals.reports);
});

export default router;
