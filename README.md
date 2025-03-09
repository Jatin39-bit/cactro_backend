# Cactro Backend

This is the backend for the Cactro application, which interacts with the GitHub API to fetch user profiles, repositories, and create issues.

## Project Structure

```
.env
app.js
package.json
server.js
controllers/
  github.controller.js
routes/
  github.route.js
```

## Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd cactro_backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:
    ```env
    PORT=3001
    GITHUB_TOKEN=your_github_token
    GITHUB_USERNAME=your_github_username
    API_KEY=your_api_key
    ```

## Usage

1. Start the server:
    ```sh
    npm start
    ```

2. The server will run on the port specified in the `.env` file (default is 3001).

## API Endpoints

### Get GitHub Profile

- **URL:** `/github`
- **Method:** `GET`
- **Description:** Fetches the GitHub profile and repositories of the user specified in the `.env` file.

### Get GitHub Repository

- **URL:** `/github/:repoName`
- **Method:** `GET`
- **Description:** Fetches details of a specific repository and its issues.
- **URL Parameters:**
  - `repoName` - The name of the repository.

### Create GitHub Issue

- **URL:** `/github/:repoName/issues`
- **Method:** `POST`
- **Description:** Creates a new issue in the specified repository.
- **URL Parameters:**
  - `repoName` - The name of the repository.
- **Headers:**
  - `x-api-key = AIzaSyD-1J2ZQ7QJ` - API key for authentication.
- **Request Body:**
  - `title` - The title of the issue (required).
  - `body` - The body of the issue (optional).

## Rate Limiting

The application uses `express-rate-limit` to limit the number of requests to 500 per 15 minutes.

## License

This project is licensed under the ISC License.

