
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


export default app;