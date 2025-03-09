import axios from "axios";
import dotenv from "dotenv";
dotenv.config();


const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;



if (!GITHUB_USERNAME || !GITHUB_TOKEN) {
    console.error("GitHub credentials are missing from environment variables.");
    process.exit(1);
  }

  const headers = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
  };
  

export const getGithubProfile = async (req, res) => {
    try {
        const userResponse = await axios.get(
          `https://api.github.com/users/${GITHUB_USERNAME}`,
          { headers }
        );
        const reposResponse = await axios.get(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos`,
          { headers }
        );
    

        const data = {
            name: userResponse.data.name,
            username: userResponse.data.login,
            avatar: userResponse.data.avatar_url,
            bio: userResponse.data.bio,
          followers: userResponse.data.followers,
          following: userResponse.data.following,
          public_repos: userResponse.data.public_repos,
          repositories: reposResponse.data.map((repo) => ({
            name: repo.name,
            url: repo.html_url,
          })),
        };
        res.json(data);
      } catch (error) {
        console.error("Error fetching GitHub profile data: ", error.message);
        res.status(500).json({ message: "Error fetching GitHub data" });
      }
    }

    export const getGithubRepo = async (req, res) => {
        const { repoName } = req.params;
        try {
          const repoResponse = await axios.get(
            `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}`,
            { headers }
          );
          const issuesResponse = await axios.get(
            `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/issues`,
            { headers }
          );
          const data = {
            name: repoResponse.data.name,
            description: repoResponse.data.description,
            stars: repoResponse.data.stargazers_count,
            forks: repoResponse.data.forks_count,
            language: repoResponse.data.language,
            created_at: repoResponse.data.created_at,
            issues: issuesResponse.data.map((issue) => ({
              title: issue.title,
              url: issue.html_url,
            })),
          };
          res.json(data); 
        } catch (error) {
          console.error("Error fetching repository data: ", error.message);
          res.status(404).json({ message: "Repository not found" });
        }
      }

        export const createGithubIssue = async (req, res) => {
            const { repoName } = req.params;
            const { title, body } = req.body;
          
            if (!title) {
              return res.status(400).json({ message: "Issue title is required" });
            }
          
            try {
              const issueResponse = await axios.post(
                `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/issues`,
                { title, body },
                { headers }
              );
              res.json({ issueUrl: issueResponse.data.html_url });
            } catch (error) {
              console.error("Error creating GitHub issue: ", error.message);
              res.status(400).json({ message: "Error creating GitHub issue" });
            }
          }



