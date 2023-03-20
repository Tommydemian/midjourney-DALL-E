import mongoose from 'mongoose'

export function connectDb(url) {
    mongoose.connect(url)
    .then(() => console.log('db connected'))
    .catch((err) => console.log(err))
}