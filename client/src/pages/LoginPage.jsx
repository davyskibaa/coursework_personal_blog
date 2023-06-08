import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {checkIsAuth, loginUser} from "../redux/features/auth/authSlice";
import {toast} from "react-toastify";

export const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const {status} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const isAuth = useSelector(checkIsAuth)
    const navigate = useNavigate()

    useEffect(() => {
        if(status){
            if(status === 'Вы успешно вошли в систему!') {
                toast.info(status)
            }
            else {
                toast.error(status)
            }
        }
        if(isAuth) navigate('/')
    }, [status, isAuth, navigate])

    const handleSubmit = () => {
        try {
            dispatch(loginUser({ username, password }))
            setPassword('')
            setUsername('')
        } catch (error) {
            console.log(error, error.name)
        }
    }

    return <div className="col-md-4 mx-auto mt-5">
        <form onSubmit={(e) => e.preventDefault()}>
            <legend className="text-center">Авторизация</legend>
            <div className="mb-3">
                <label htmlFor="exampleInputText" className="form-label">Имя пользователя</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control"></input>
            </div>
            <div className="mb-3">
                <label htmlFor="inputPassword5" className="form-label">Пароль</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="inputPassword5" className="form-control"></input>
            </div>
            <div className="d-grid gap-3">
                <button type="submit" onClick={handleSubmit} className="btn btn-primary">Войти</button>
                <div className="text-center">
                    <text> Ещё нет аккаунта? </text>
                    <Link to='/register' className="">Зарегистрироваться</Link>
                </div>
            </div>
        </form>
    </div>
}