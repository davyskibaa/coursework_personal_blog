import React from "react"
import Moment from "react-moment";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {removeUser} from "../redux/features/auth/authSlice";

export const UserItem = ({ user }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    if(!user) {
        return <div>Загрузка...</div>
    }

    const handleDelete = (id) => {
        try {
            dispatch(removeUser(id))
            navigate('/users')
        } catch (err) {
            console.log(err)
        }
    }

    return <div className="border">
        {user.username}
        <Moment date={user.createdAt} format='DD.MM.YYYY hh:mm'></Moment>
        <button className="bg-transparent border-0 px-3" onClick={() => handleDelete(user._id)}><i className="bi bi-trash text-danger"></i></button>
    </div>
}