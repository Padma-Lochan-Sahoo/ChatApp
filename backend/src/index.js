import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { connectDB } from './lib/db.js'
import cors from 'cors'

dotenv.config()

const app = express()

// middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json({ limit: '10mb' })); // or higher if needed
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser()) // allow you to parse the cookie

// routes
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"

app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);

// Add the error handler here, after all routes
app.use((err, req, res, next) => {
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ message: "Image too large. Please upload a smaller image." });
  }
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 3000
app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB()
})

