import React from 'react'
import Moment from "react-moment";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {removeComment} from "../redux/features/comments/commentSlice";
import {checkIsAuth} from "../redux/features/auth/authSlice";

export const CommentItem = ({ cmt }) => {
    const params = useParams()
    const dispatch = useDispatch()
    const isAuth = useSelector(checkIsAuth)
    const { user } = useSelector((state) => state.auth)

    const removeHandler = (id) => {
        try {
            const postId = params.id
            dispatch(removeComment({postId, id}))
        } catch (err) {
                console.log(err)
            }
        }

    return <div className='flex pt-3'>
        <div className='text-primary'>
            <i className="bi bi-person-circle"></i> {cmt.username} <Moment className='text-secondary' date={cmt.createdAt} format='DD.MM.YYYY hh:mm'></Moment>
            {isAuth && user?.role === 1 && (
                <button className="bg-transparent border-0 px-3" onClick={() => removeHandler(cmt._id)}><i className="bi bi-trash text-danger"></i></button>
                )}
        </div>
        <div className>{cmt.comment}</div>
    </div>
}

