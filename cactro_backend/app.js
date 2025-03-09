
import express from "express";
import rateLimit from "express-rate-limit";
import githubRouter from "./routes/github.route.js";

const app = express();

app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
});
app.use(limiter);

app.use("/github", githubRouter);

app.use("*", (req, res) => {
  res.status(404).send(
  `Route not found. Available routes are:

  GET /github
  - Fetches the GitHub profile and repositories of the user specified in the .env file.

  GET /github/:repoName
  - Fetches details of a specific repository and its issues.

  POST /github/:repoName/issues
  - Creates a new issue in the specified repository. Requires x-api-key header for authentication (check readme.md file for key).
  `
);
});


export default app;
