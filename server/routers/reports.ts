import express from "express";
import reports from "../controllers/reports";

const router = express.Router();

router.post("/create", reports.createReport, (_req, res) => {
  res.status(200).send(res.locals.report);
});

router.get("/", reports.getReports, (_req, res) => {
  res.status(200).send(res.locals.reports);
});

export default router;
