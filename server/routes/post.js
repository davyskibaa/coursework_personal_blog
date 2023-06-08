import { Router } from 'express'
import { checkAuth } from "../utils/checkAuth.js";
import {
    createPost,
    getAll,
    getById,
    getPostComments,
    removePost,
    updatePost
} from "../controllers/posts.js";
import {removeComment} from "../controllers/comments.js";

const router = new Router()

router.post('/', checkAuth, createPost)
router.get('/', getAll)
router.get('/:id', getById)
router.delete('/:id', checkAuth, removePost)
router.put('/:id', checkAuth, updatePost)
router.get('/comments/:id', checkAuth, getPostComments)
router.delete('/comments/:postId/:id', checkAuth, removeComment)


export default router