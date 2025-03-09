
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
  res.status(404).json({
    message: "Route not found. Available routes are:",
    routes: {
      getGithubProfile: {
        method: "GET",
        path: "/github",
        description: "Fetches the GitHub profile and repositories of the user specified in the .env file."
      },
      getGithubRepo: {
        method: "GET",
        path: "/github/:repoName",
        description: "Fetches details of a specific repository and its issues."
      },
      createGithubIssue: {
        method: "POST",
        path: "/github/:repoName/issues",
        description: "Creates a new issue in the specified repository. Requires x-api-key header for authentication."
      }
    }
  });
});


export default app;
