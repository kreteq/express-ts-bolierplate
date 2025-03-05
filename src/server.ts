import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "./routes/userRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import logger from "./middlewares/logger";
import connectDB from "./config/database";

dotenv.config();
const app = express();

connectDB(); // Connects to MongoDB

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/users", userRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
