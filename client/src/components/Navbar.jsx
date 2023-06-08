import React from 'react'
import {Link, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {checkIsAuth, logout} from "../redux/features/auth/authSlice";
import {toast} from "react-toastify";

export const Navbar = () => {
    const isAuth = useSelector(checkIsAuth)
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    const activeStyle = {
        color: 'gray',
    }

    const logoutHandler = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
        toast.info('Вы вышли из системы')
    }

    return <div className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container w-75">
            <NavLink to={'/'} className="navbar-brand me-0"> MyPersonalBlog <i className="bi bi-layout-text-window-reverse"></i></NavLink>
            <div className="collapse navbar-collapse justify-content-center" id="navbarCenteredExample">
                {isAuth && user?.role === 1 &&(
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to={'/users'} className="nav-link active"
                                     style={({isActive}) => isActive ? activeStyle : undefined}>Пользователи</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={'/new'} className="nav-link active"
                                     style={({isActive}) => isActive ? activeStyle : undefined}>Добавить пост</NavLink>
                        </li>
                    </ul>)
                }
            </div>
            {isAuth ? (
                <button type="button" onClick={logoutHandler} className="btn btn-outline-primary">Выйти</button>) : (
                <Link to={'/login'} className="btn btn-primary">Войти</Link>)
            }
        </div>
    </div>
}