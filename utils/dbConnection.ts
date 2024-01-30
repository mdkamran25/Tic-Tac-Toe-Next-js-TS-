import mongoose from "mongoose";

mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI!)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error.message);
  });