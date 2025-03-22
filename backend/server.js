import express from 'express'; 
import { connectDB } from './config/db.js'
import dotenv from 'dotenv'; 
import productRoutes from './routes/product.route.js'; 
import cors from 'cors'
import authRoutes from "./routes/authRoutes.js"; 
import cookieParser from 'cookie-parser'; 


dotenv.config(); 
const app = express(); 
app.use(express.json()); 

app.use("/api/products", productRoutes)
const PORT = process.env.PORT || 5000 

app.listen(PORT, () => {
    connectDB(); 
    console.log("server started at http://localhost:" + PORT);
})

app.use(
    cors({
        origin: 'http://localhost:3000',
        method: ["GET","POST"],
        credentials: true,
    })
);
app.use(cookieParser()); 
app.use("/", authRoutes)


