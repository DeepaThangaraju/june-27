import express from "express";
import connectDb from "./connection/connect.js";
import "dotenv/config";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use("/api/user", userRoutes);
app.use(cors());



const port = 8000;
const url = process.env.url;
connectDb(url);
app.listen(port, () => {
    console.log(`server running in ${port}`)
})