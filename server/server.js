import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongodb from './configs/mongodb.js';
import userRouter from './routes/userRoutes.js';

// App config
const PORT = process.env.PORT || 4000
const app = express()
await mongodb()

//intialize middelwares
app.use(express.json())
app.use(cors())

//api routes
app.get('/',(req,res)=>res.send("API Woeking"))
app.use('/api/user',userRouter)

app.listen(PORT,()=>console.log("server running on port "+PORT))