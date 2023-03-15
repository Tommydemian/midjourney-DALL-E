import express, { Router } from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config()

const router = Router()

const configuration = new Configuration({
    apiKey:process.env.OPEN_AI_KEY 

});

const openai = new OpenAIApi(configuration)

router.get('/', (req, res) => {
    res.send('hello from apikey')
})

router.post('/', async (req, res) => {
    try {
        const { prompt } = req.body
        const aiResponse = await openai.createImage({
            prompt, 
            n:1, 
            size: '1024x1024', 
            response_format: 'b64_json'
        })
        console.log(aiResponse.data.data)
        const image = aiResponse.data.data[0].b64_json
        res.status(200).json(image)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})


export default router;