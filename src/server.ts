import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

import { errorHandler } from "./middlewares/errorHandler";
import logger from "./libs/Logger";
import connectDB from "./config/database";


import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";

import v1Routes from './routes/api/v1';
authRoutes

dotenv.config();
const app = express();

const allowedOrigins = ['http://localhost:3000'];

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api',v1Routes)

app.use(errorHandler);



// Start server after connecting to the database
const PORT = process.env.PORT || 3000;
const startServer = async () => {
  try {
    await connectDB(); // Ensure the DB connection is established before starting the server
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error("Failed to connect to the database", error);
    process.exit(1);
  }
};
startServer();