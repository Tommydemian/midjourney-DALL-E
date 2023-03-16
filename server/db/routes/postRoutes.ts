import express, { Router } from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../models/post';

dotenv.config()

const router = Router()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// get all
router.get('/', async(req, res) => {
  try {
    const posts = await Post.find({})
    res.status(200).json({ success: true, data: posts })
  } catch (error) {
    res.status(500).json({ success: false, message: error })
  }
})

//create a post
router.post('/', async (req, res) => {
    try {
        const { name, prompt, photo } = req.body;
        const photoUrl = await cloudinary.uploader.upload(req.body.photo)

        const newPost = Post.create({
            name,
            prompt,
            photo: photoUrl.url
        });
        res.status(201).json({ success: true, data: newPost });

    } catch (error) {
        res.status(500).json({ success: false, message: error })
        console.log(error)
    }
});


export default router;