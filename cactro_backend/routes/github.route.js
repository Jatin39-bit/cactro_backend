import express from "express";
import * as githubController from "../controllers/github.controller.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router()

const API_KEY = process.env.API_KEY;

const authenticate = (req, res, next) => {
    const apiKey = req.header("x-api-key");
    if (apiKey === API_KEY) {
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  };

router.get("/",githubController.getGithubProfile);
router.get("/:repoName",githubController.getGithubRepo);
router.post("/:repoName/issues",authenticate,githubController.createGithubIssue);


export default router;
