import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Comment from "../models/Comment.js";

// Register user
export const register = async (req, res) => {
    try {
        const { username, password } = req.body // из реквеста пользователя берем имя и пароль

        const isUsed = await User.findOne({ username }) // ищем, есть ли пользователи с таким же username
        if (isUsed) {
            return res.json({
                message: 'Данное имя пользователя уже занято!',
            })
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const newUser = new User({
            username,
            password: hash,
            role: 2
        })

        const token = jwt.sign(
            {
                id: newUser._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' },
        )

        await newUser.save()

        res.json({
            newUser,
            token,
            message: 'Регистрация прошла успешно!',
        })
    } catch (error) {
        res.json({ message: 'Ошибка при создании пользователя!' })
    }
}

// Login user
export const login = async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await User.findOne({ username }) // поиск пользователя в БД
        if(!user) {
            return res.json({
                message: 'Такого пользователя не существует!'
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if(!isPasswordCorrect) {
            return res.json({
                message: 'Неверный пароль!'
            })
        }

        const token = jwt.sign({
                id: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        )

        res.json({
            token, user, message: 'Вы успешно вошли в систему!'
        })

    } catch (err) {
        res.json({message: 'Ошибка при авторизации пользователя!'})
    }
}

// Get user
export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        if(!user) {
            return res.json({
                message: 'Такого пользователя не существует!',
            })
        }

        const token = jwt.sign({
                id: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        )

        res.json({
            token, user
        })
    } catch (err) {
        res.json({message: 'Нет доступа!'})
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find()


        if(!users) {
            return res.json({ message: 'Постов нет!' })
        }

        res.json({ users })
    } catch (err) {
        return res.json({ message: 'Ошибка при получении постов!' })
    }
}

export const removeUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        await Promise.all(
            user.comments.map((comment) => {
                return Comment.findByIdAndDelete(comment)
            })
        )

        await User.findByIdAndDelete(user)

        if(!user) {
            return res.json({ message: 'Такого поста не существует!' })
        }

        res.json({message: 'Пост был успешно удален!'})
    } catch (err) {
        res.json({ message: 'Ошибка при удалении поста!' })
    }
}