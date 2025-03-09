import app from './app.js';
import dotenv from 'dotenv';
import http from 'http';

dotenv.config();

const PORT = process.env.PORT || 3001

const server = http.createServer(app)


server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})