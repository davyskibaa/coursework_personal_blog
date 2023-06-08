import React, {useCallback, useEffect, useState} from 'react'
import Moment from "react-moment";
import axios from "../utils/axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {removePost} from "../redux/features/post/postSlice";
import {createComment, getPostComments} from "../redux/features/comments/commentSlice";
import {CommentItem} from "../components/CommentItem";
import {checkIsAuth} from "../redux/features/auth/authSlice";

export const PostPage = () => {
    const [post, setPost] = useState(null)
    const [comment, setComment] = useState('')

    const isAuth = useSelector(checkIsAuth)

    const {user} = useSelector((state) => state.auth)
    const {comments} = useSelector((state) => state.comment)

    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const removePostHandler = () => {
        try {
            dispatch(removePost(params.id))
            navigate('/')
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

    const handlerSubmit = () => {
        try {
            const postId = params.id
            dispatch(createComment({postId, comment}))
            setComment('')
        } catch (err) {
            console.log(err)
        }
    }

    const fetchComments = useCallback(async () => {
        try {
            dispatch(getPostComments(params.id))
        } catch (err) {
            console.log(err)
        }
    }, [params.id, dispatch])

    const fetchPost = useCallback(async () => {
        const {data} = await axios.get(`/posts/${params.id}`)
        setPost(data)
    }, [params.id])

    useEffect(() => {
        fetchPost()
    }, [fetchPost])

    useEffect(() => {
        fetchComments()
    }, [fetchComments])


    if (!post) {
        return <div></div>
    }

    return <div className="container mt-3 w-75">
        <Link to={'/'} className="btn text-primary p-0 m-0">Назад</Link>
        <div className="border-bottom"></div>
        <div className=" mb-3 p-0 m-0">
            <div className={post.imgUrl ? 'img-container' : 'h-0'}>
                {post?.imgUrl && (
                    <img className=""
                         style={{display: 'block', width: '100%', height: '300px', 'object-fit': "cover"}}
                         src={`http://localhost:5555/${post.imgUrl}`} alt=""/>
                )}
            </div>
            <div className="px-3 py-2 text-break">
                <div className="d-flex justify-content-between">
                    <div>
                        <div className="text-secondary">Опубликовано <Moment date={post.createdAt}
                                                                             format='DD.MM.YYYY'></Moment></div>
                        <div className="text-secondary">Автор статьи: {post.username}</div>
                    </div>
                    {user?._id === post.author && (
                        <div>
                            <button className="bg-transparent border-0 px-0">
                                <Link className="text-decoration-none text-reset" to={`/${params.id}/edit`}><i
                                    className="bi bi-pencil text-primary"></i></Link>
                            </button>
                            <button className="bg-transparent border-0 px-3" onClick={removePostHandler}><i
                                className="bi bi-trash text-danger"></i></button>
                        </div>)}
                </div>

                <h3 className="p-0 m-0"><b>{post.title}</b></h3>
                <div>{post.text}</div>
            </div>

            <p className="border-top"></p>
            <div className="px-3">
                <p></p>
                <p className="fw-semibold">Понравилась статья? Поделитесь своим мнением в комментариях..</p>

                { isAuth ? (
                    <form className="row" onSubmit={(e) => e.preventDefault()}>
                        <div className="col-8">
                            <input
                                type='text'
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder='Оставьте комментарий..'
                                className="form-control"
                            />
                        </div>
                        <div className="col">
                            <button type='submit' onClick={handlerSubmit} className="btn btn-primary">
                                Отправить
                            </button>
                        </div>
                    </form>

                ) : ( <div className="text-danger">Для отправки комментариев необходима авторизация на сайте!</div> )}

                {comments?.map((cmt) => (
                    <CommentItem key={cmt._id} cmt={cmt}></CommentItem>
                ))}
            </div>
        </div>
    </div>
}