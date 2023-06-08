import React, { useState, useEffect } from 'react'
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {checkIsAuth, registerUser} from "../redux/features/auth/authSlice";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

export const RegisterPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const {status} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const isAuth = useSelector(checkIsAuth)
    const navigate = useNavigate()

    useEffect(() => {
        if(status){
            if(status === 'Регистрация прошла успешно!') {
                toast.success(status)
            }
            else {
                toast.error(status)
            }
        }
        if(isAuth) navigate('/')
    }, [status, isAuth, navigate])

    const handleSubmit = () => {
        try {
            dispatch(registerUser({ username, password }))
            setPassword('')
            setUsername('')
        } catch (error) {
            console.log(error, error.name)
        }
    }

    return <div className="col-md-4 mx-auto mt-5">
        <form onSubmit={(e) => e.preventDefault()}>
            <legend className="text-center">Регистрация</legend>
            <div className="mb-3">
                <label htmlFor="exampleInputText" className="form-label">Имя пользователя</label>
                <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" ></input>
            </div>
            <div className="mb-3">
                <label htmlFor="inputPassword5" className="form-label">Пароль</label>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} className="form-control"></input>
            </div>
            <div className="d-grid gap-3">
                <button type="button" onClick={handleSubmit} className="btn btn-primary">Зарегистрироваться</button>
                <div className="text-center">
                    <text> Уже есть аккаунт? </text>
                    <Link to='/login' className="">Войти</Link>
                </div>
            </div>
        </form>
    </div>
}