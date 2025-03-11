import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "../libs/Logger";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, { dbName: "express_ts_app" });
    logger.info(`MongoDB connected successfully`);
  } catch (error) {
    logger.error(`MongoDB connection failed:`,error) ;
    process.exit(1);
  }
};

export default connectDB;
