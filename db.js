import mongoose from "mongoose";
export const connectWithDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI, {
      tls: true,
    })
    .then(() => {
      console.log("DB Connected");
    })
    .catch((error) => {
      console.log("Something went wrong while connecting DB => ", error);
    });
};
