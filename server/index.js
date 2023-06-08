import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors' // разрешает запросы к бэку с разных IP-адресов
import fileUpload from 'express-fileupload'

import authRoute from './routes/auth.js'
import postRoute from './routes/post.js'
import commentRoute from './routes/comment.js'

const app = express()
dotenv.config()

const PORT = process.env.PORT
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

// Middleware - расширение функционала
app.use(cors())
app.use(express.json())
app.use(fileUpload())
app.use(express.static('uploads'))

// Маршруты
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/comments', commentRoute)

async function start() {
    try {
        await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.iusavwr.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`) // подключение к БД
        app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
    } catch (err) {
        console.log(err)
    }
}

start()