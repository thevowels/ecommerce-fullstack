import mongoose from "mongoose";

let isConnected = false;

export const connectOrderDB = async () => {
  if (isConnected) return;
  if (!process.env.MONGO_URL) throw new Error("No connection string!");
  try {
    await mongoose.connect(process.env.MONGO_URL);
    isConnected = true;
	console.log("Connected to mongo-db");
  } catch (error) {
    console.log(error);
    throw error;
  }
};
