import mongoose from "mongoose";
import { env } from "./";

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = env.MONGODB_URI;

    if (!mongoURI) {
      console.error("MONGO_URI is missing");
      process.exit(1);
    }

    await mongoose.connect(mongoURI, {
      autoIndex: false,
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`MongoDB Connected Successfully`.bgWhite.black);

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB runtime error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected. Retrying...");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("MongoDB reconnected");
    });
  } catch (error) {
    console.error(`MongoDB connection failed: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
