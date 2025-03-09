
import express from "express";
import rateLimit from "express-rate-limit";
import githubRouter from "./routes/github.route.js";
import fs from "fs"
import path from "path"
import {marked} from "marked"
import { fileURLToPath } from "url";

const app = express();

app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
});
app.use(limiter);

app.use("/github", githubRouter);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("*", (req, res) => {
  const readmePath = path.join(__dirname, "README.md");

  fs.readFile(readmePath, "utf8", (err, data) => {
      if (err) {
          return res.status(500).send("Error reading README file.");
      }
      const htmlContent = marked.parse(data);
      res.send(`
          <html>
            <head>
                <title>Project README</title>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet">
                <link href="https://fonts.googleapis.com/css2?family=Fira+Code&display=swap" rel="stylesheet">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/monokai-sublime.min.css">
                <style>
                    body {
                        font-family: 'Poppins', sans-serif;
                        padding: 40px;
                        max-width: 1000px;
                        margin: auto;
                        line-height: 1.8;
                        color: #EAECEF;
                        background-color: #252A34;
                    }
                    main {
                        background: #1A1F28;
                        padding: 30px;
                        border: 2px solid #FF2E63;
                        border-radius: 12px;
                        box-shadow: 0 6px 12px rgba(255, 46, 99, 0.3);
                    }
                    h1 {
                        color: #FF2E63;
                        font-size: 3em;
                        text-shadow: 0 2px 4px rgba(255, 46, 99, 0.5);
                        margin-bottom: 0.5em;
                    }
                    h2 {
                        color: #08D9D6;
                        font-size: 2.2em;
                        font-style: italic;
                        margin-top: 1.5em;
                    }
                    h3, h4, h5, h6 {
                        color: #EAECEF;
                        position: relative;
                    }
                    h3:hover:after, h4:hover:after, h5:hover:after, h6:hover:after {
                        content: '';
                        position: absolute;
                        bottom: -5px;
                        left: 0;
                        width: 50%;
                        height: 2px;
                        background: #FF9F1C;
                    }
                    pre {
                        background: #1A1F28;
                        color: #EAECEF;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0 0 10px #08D9D6;
                        overflow-x: auto;
                    }
                    code {
                        font-family: 'Fira Code', monospace;
                    }
                    a {
                        color: #08D9D6;
                        text-decoration: underline #08D9D6;
                        transition: all 0.3s;
                    }
                    a:hover {
                        color: #FF9F1C;
                        transform: scale(1.05);
                        text-decoration: underline #FF9F1C;
                    }
                    @media (max-width: 768px) {
                        body {
                            padding: 20px;
                        }
                        h1 {
                            font-size: 2.2em;
                        }
                        h2 {
                            font-size: 1.8em;
                        }
                        main {
                            padding: 20px;
                        }
                    }
                </style>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/highlight.min.js"></script>
                <script>document.addEventListener('DOMContentLoaded', () => { hljs.highlightAll(); });</script>
            </head>
            <body>
                <main>
                    ${htmlContent}
                </main>
            </body>
            </html>
      `);
  });
});


export default app;
