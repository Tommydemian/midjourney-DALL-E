import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import postRoutes from './db/routes/postRoutes.js'
import dalleRoutes from './db/routes/dalleRoutes.js'
import { connectDb } from './db/index.js'

dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors()) 
app.use('/api/posts', postRoutes)
app.use('/api/dalle', dalleRoutes)

connectDb(process.env.MONGO_URI)

app.get('/', (req,res) => {
  res.send('Hello from DALL-E 2.whataver')
})

app.listen(port,  () => {
    console.log(`app running in port ${port}`)
});

