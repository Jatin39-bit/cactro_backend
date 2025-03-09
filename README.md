# GitHub API Integration Backend

This project is a Node.js backend that integrates with the GitHub API to display GitHub activity on your portfolio website. It provides endpoints to fetch profile data, retrieve repository details, and create issues on a repository.

## Features

- **GET /github**  
  Retrieves your GitHub profile data including name, username, avatar, bio, followers, following, public repository count, and a list of repositories.

- **GET /github/:repoName**  
  Retrieves detailed information about a specific repository such as its description, stars, forks, language, creation date, and open issues.

- **POST /github/:repoName/issues**  
  Creates a new issue in the specified repository. This endpoint is secured using an API key that must be provided in the `x-api-key` header.

- **Rate Limiting**  
  The API is protected with a rate limiter to prevent abuse (500 requests per 15 minutes).

## Prerequisites

- **Node.js** (v12 or higher recommended)
- **npm** (Node Package Manager)
- A GitHub Personal Access Token with the necessary scopes:
  - `read:user` (to fetch your profile data)
  - `public_repo` (to create issues on public repositories)  
    _or_  
  - `repo` (if working with private repositories)
- An API key to secure the issue creation endpoint

**API_KEY=AIzaSyD-1J2ZQ7QJ**
