import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

// middleware
app.use(express.json()) // allow you to extract the json data out of req.body


// routes
import authRoutes from "./routes/auth.route.js"
import { connectDB } from './lib/db.js'

app.use("/api/auth",authRoutes);


const PORT = process.env.PORT || 3000
app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB()
})

