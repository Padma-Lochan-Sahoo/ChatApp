import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { connectDB } from './lib/db.js'
import cors from 'cors'

dotenv.config()

const app = express()

// middleware
app.use(express.json()) // allow you to extract the json data out of req.body
app.use(cookieParser()) // allow you to parse the cookie
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

// routes
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"

app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);


const PORT = process.env.PORT || 3000
app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB()
})

