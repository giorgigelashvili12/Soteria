import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("Mongo Uri not defined");

    const connection = await mongoose.connect(uri);
    console.log(`connected: ${connection.connection.host}`);
  } catch (e) {
    if (e instanceof Error) {
      console.log("failed to connect ", e.message);
    }
    console.log("failed to connect");
    process.exit(1);
  }
};

export default connectDB;
