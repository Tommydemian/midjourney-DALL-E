import express, { Router } from 'express';
import * as dotenv from 'dotenv';
import { v2 } from 'cloudinary';

import Post from '../models/post';

dotenv.config()

const router = Router()


export default router;