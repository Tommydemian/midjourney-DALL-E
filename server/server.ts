import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import postRoutes from './db/routes/postRoutes'
import dalleRoutes from './db/routes/dalleRoutes'
import { connectDb } from './db'

dotenv.config();

const port = process.env.PORT;

const app = express();


app.use(express.json())
app.use(cors()) 
app.use('/api/posts', postRoutes)
app.use('/api/dalle', dalleRoutes)

connectDb(process.env.MONGO_URI as string)

app.get('/', (req,res) => {
  res.send('Hello from DALL-E 2.whataver')
})

app.listen(port,  () => {
    console.log(`app running in port ${port}`)
});

