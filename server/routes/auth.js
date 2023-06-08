import { Router } from 'express'
import {register, login, getUser, getUsers, removeUser} from '../controllers/auth.js'
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router()

router.post('/register', register)
router.post('/login', login)
router.get('/me', checkAuth, getUser)
router.get('/users', checkAuth, getUsers)
router.delete('/users/:id', removeUser)

export default router