import React, {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {UserItem} from "../components/UserItem";
import {getUsers} from "../redux/features/auth/authSlice";

export const UsersPage = () => {
    const dispatch = useDispatch()
    const { users } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(getUsers())
    }, []);

    return <div className="table container mt-3 w-75">
        <ul>
            {users?.map((user) => <UserItem user={user} key={user._id}/>)}
        </ul>
    </div>
}