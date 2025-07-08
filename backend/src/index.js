import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { connectDB } from './lib/db.js'
import cors from 'cors'
import { app, server } from './lib/socket.js' // importing socket-wrapped app

dotenv.config()

// ✅ Middlewares
app.use(cors({
  origin: "https://convo-flow-frontend.vercel.app",
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// ✅ Routes
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

// ✅ Error handler for large image upload
app.use((err, req, res, next) => {
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ message: "Image too large. Please upload a smaller image." });
  }
  res.status(500).json({ message: "Internal server error" });
});

app.get('/',(req,res)=>{
    res.send('Server is running')
})

// ✅ Start Server
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  connectDB();
});
