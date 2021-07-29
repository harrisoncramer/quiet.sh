import express from "express";
import exposures from "../controllers/exposures";

const router = express.Router();

router.post("/", exposures.getExposures, (_req, res) => {
  res.status(200).send(res.locals.exposures);
});

export default router;
