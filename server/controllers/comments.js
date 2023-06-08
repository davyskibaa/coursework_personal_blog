import Comment from "../models/Comment.js"
import Post from "../models/Post.js"
import User from "../models/User.js"

export const createComment = async (req, res) => {
    try {
        const {postId, comment} = req.body
        const user = await User.findById(req.userId)

        if (!comment) {
            return res.json({message: 'Комментарий не может быть пустым!'})
        }

        const newComment = new Comment({comment, username: user.username, author: req.userId})
        await newComment.save()
        await User.findByIdAndUpdate(req.userId, { // в массив постов пользователя пушим пост
            $push: { comments: newComment._id }
        })

        try {
            await Post.findByIdAndUpdate(postId, {
                $push: { comments: newComment._id }
            })
        } catch (err) {
            console.log(err)
        }

        res.json(newComment)
    } catch (err) {
        res.json( {message: 'Что-то пошло не так'})
    }
}

export const removeComment = async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id)

        await Post.findByIdAndUpdate(req.params.postId, {
            $pull: {comments: req.params.id}
        })

        await User.findByIdAndUpdate(req.userId, {
            $pull: {comments: req.params.id}
        })

        res.json({message: 'Комментарий был успешно удален!'})
    } catch (err) {
        res.json({ message: 'Ошибка при удалении комментария!' })
    }
}