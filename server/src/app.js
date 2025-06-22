import express from 'express';
import bodyParser from 'body-parser';
import { setRoutes } from './routes/index.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// This line allows CORS from Vite (default port 5173)
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up routes
setRoutes(app);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
