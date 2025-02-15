import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    console.log("Connecting to database......");
    await mongoose.connect(process.env.DB_CONNECT_URI); // returns a promise.
    console.log("Connected to MongoDB........");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default ConnectDB;
