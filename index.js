import express from 'express'
import dotenv from 'dotenv';
import contactRouter from "./routes/contacts.js"
import mongoose from "mongoose"
import cors from 'cors'
dotenv.config();

const app = express()






let isConnected = false;
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    isConnected = true;
    console.log('[INFO] Connected to DB.\n\n\n')
  } catch (error) {
    console.log(`[ERROR] Failed to connect to DB: ${error}`)
  }
}

app.use(async (req, res, next) => {
  if (!isConnected) {
    connectToDB()
  }
  next()
})







app.use(express.json())

const corsOptions = {
  origin: process.env.FRONTEND_URL,
};
app.use(cors(corsOptions))

app.use('/api/contacts',contactRouter)




app.get('/', async (req, res) => {
    res.status(200).json({ status: 'running' })
})


// app.listen(process.env.API_PORT, () => {
//     connectToDB()
//     console.log(`Server listening on port: ${process.env.API_PORT}`)
// })

export default app
