import express from "express";

export const router = express.Router();

import {
  getAllJobs,
  getJobs,
  createJob,
  updateJob,
  deleteJob,
} from "../controllers/jobs.js";

router.route("/").post(createJob).get(getAllJobs);
router.route("/:id").get(getJobs).delete(deleteJob).patch(updateJob);
