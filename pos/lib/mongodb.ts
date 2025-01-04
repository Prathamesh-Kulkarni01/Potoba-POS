import mongoose from "mongoose";
const { MONGODB_URI } = process.env;
 const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect('mongodb+srv://prathameshkulkarni710:X9jENe09TNqCx5Pu@cluster0.a390b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0' as string);
    if (connection.readyState === 1) {
      return Promise.resolve(true);
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
export default connectDB