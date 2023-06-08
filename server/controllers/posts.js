import Post from '../models/Post.js'
import User from '../models/User.js'
import Comment from '../models/Comment.js'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

export const createPost = async (req, res) => {
    try {
        const {title, text} = req.body
        const user = await User.findById(req.userId)

        if(req.files) {
            let fileName = Date.now().toString() + req.files.image.name // название загруженной картинки
            const __dirname = dirname(fileURLToPath(import.meta.url)) // путь к папке, в которой находимся (controllers)
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))

            const newPostWithImage = new Post({
                username: user.username,
                title,
                text,
                imgUrl: fileName,
                author: req.userId
            })

            await newPostWithImage.save() // сохранение поста в БД
            await User.findOneAndUpdate(req.userId, { // в массив постов пользователя пушим пост
                $push: { posts: newPostWithImage }
            })

            return res.json(newPostWithImage)
        }

        const newPostWithoutImage = new Post({
                username: user.username,
                title,
                text,
                imgUrl: '',
                author: req.userId
            }
        )

        await newPostWithoutImage.save() // сохранение поста в БД
        await User.findOneAndUpdate(req.userId, { // в массив постов пользователя пушим пост
            $push: { posts: newPostWithoutImage }
        })

        res.json(newPostWithoutImage)
    } catch (err) {
        res.json({ message: 'Ошибка при создании поста!' })
    }
}

export const getAll = async (req, res) => {
    try {
        const posts = await Post.find().sort('-createdAt')
        const popularPosts = await Post.find().limit(5).sort('-views')

        if(!posts) {
            return res.json({ message: 'Постов нет!' })
        }

        res.json({ posts, popularPosts })
    } catch (err) {
        return res.json({ message: 'Ошибка при получении постов!' })
    }
}

export const getById = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 }
        })

        res.json(post)
    } catch (err) {
        res.json({ message: 'Ошибка при получении поста!' })
    }
}

export const removePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id)
        if(!post) {
            return res.json({ message: 'Такого поста не существует!' })
        }

        await User.findByIdAndUpdate(req.userId, {
            $pull: {posts: req.params.id}
        })

        res.json({message: 'Пост был успешно удален!'})
    } catch (err) {
        res.json({ message: 'Ошибка при удалении поста!' })
    }
}

export const updatePost = async (req, res) => {
    try {
        const { title, text, id} = req.body
        const post = await Post.findById(id)

        if(req.files) {
            let fileName = Date.now().toString() + req.files.image.name // название загруженной картинки
            const __dirname = dirname(fileURLToPath(import.meta.url)) // путь к папке, в которой находимся (controllers)
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))
            post.imgUrl = fileName || ''
        }

        post.title = title
        post.text = text

        await post.save()

        res.json(post)
    } catch (err) {
        res.json({ message: 'Ошибка при обновлении поста!' })
    }
}

export const getPostComments = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        const list = await Promise.all(
            post.comments.map((comment) => {
                return Comment.findById(comment)
            })
        )

        res.json(list)
    } catch (err) {
        res.json({ message: 'Ошибка при обновлении поста!' })
    }
}