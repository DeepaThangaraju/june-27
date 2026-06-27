import mongoose from "mongoose";
const connectDb = async (url) => {
    try {
        await mongoose.connect(url);
        console.log("connected")
    } catch(err) {
        console.log("Mongo not connected",err.message)
 }
}

export default connectDb;