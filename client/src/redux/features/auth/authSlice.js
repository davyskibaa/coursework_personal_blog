import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "../../../utils/axios"

const initialState = {
    user: null,
    token: null,
    isLoading: false,
    status: null,
    users: []
}

export const registerUser = createAsyncThunk('auth/registerUser', async({username, password}) => {
    try {
        const {data} = await axios.post('/auth/register', {
            username,
            password
        })
        if(data.token) { // при регистрации - автоматическая авторизация
            window.localStorage.setItem('token', data.token)
        }
        return data
    } catch (err) {
        console.log(err)
    }
})

export const loginUser = createAsyncThunk('auth/loginUser', async({username, password}) => {
    try {
        const {data} = await axios.post('/auth/login', {
            username,
            password
        })
        if (data.token) {
            window.localStorage.setItem('token', data.token)
        }
        return data
    } catch (err) {
        console.log(err)
    }
})

export const getUser = createAsyncThunk('auth/loginUser', async() => {
    try {
        const {data} = await axios.get('/auth/me')
        return data
    } catch (err) {
        console.log(err)
    }
})

export const getUsers = createAsyncThunk('auth/getUsers', async() => {
    try {
        const {data} = await axios.get('/auth/users')
        return data
    } catch (err) {
        console.log(err)
    }
})

export const removeUser = createAsyncThunk('auth/removeUser', async(id) => {
    try {
        const {data} = await axios.delete(`/auth/users/${id}`, id)
        return data
    } catch (err) {
        console.log(err)
    }
})

export const getMe = createAsyncThunk('auth/loginUser', async () => {
    try {
        const { data } = await axios.get('/auth/me')
        return data
    } catch (error) {
        console.log(error)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
            state.token = null
            state.isLoading = false
            state.status = null
        }
    },
    extraReducers: {
        [registerUser.pending]: (state) => { // отправка запроса
            state.isLoading = true
            state.status = null
        },
        [registerUser.fulfilled]: (state, action) => { // запрос выполнен
            state.isLoading = false
            state.status = action.payload.message
            state.user = action.payload.user
            state.token = action.payload.token
        },
        [registerUser.rejected]: (state, action) => { // возникла ошибка
            state.status = action.payload.message
            state.isLoading = false
        },

        [loginUser.pending]: (state) => { // отправка запроса
            state.isLoading = true
            state.status = null
        },
        [loginUser.fulfilled]: (state, action) => { // запрос выполнен
            state.isLoading = false
            state.status = action.payload.message
            state.user = action.payload.user
            state.token = action.payload.token
        },
        [loginUser.rejected]: (state, action) => { // возникла ошибка
            state.status = action.payload.message
            state.isLoading = false
        },

        [getUser.pending]: (state) => { // отправка запроса
            state.isLoading = true
            state.status = null
        },
        [getUser.fulfilled]: (state, action) => { // запрос выполнен
            state.isLoading = false
            state.status = null
            state.user = action.payload?.user
            state.token = action.payload?.token
        },
        [getUser.rejected]: (state, action) => { // возникла ошибка
            state.status = action.payload.message
            state.isLoading = false
        },

        [getUsers.pending]: (state) => {
            state.loading = true
        },
        [getUsers.fulfilled]: (state, action) => {
            state.loading = false
            state.users = action.payload.users
        },
        [getUsers.rejected]: (state) => {
            state.loading = false
        },

        [removeUser.pending]: (state) => {
            state.loading = true
        },
        [removeUser.fulfilled]: (state, action) => {
            state.loading = false
            state.users = state.users.filter((user) => user._id !== action.payload) // список пользователей "пересобирается" без удаленного поста
        },
        [removeUser.rejected]: (state) => {
            state.loading = false
        },

        [getMe.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [getMe.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = null
            state.user = action.payload?.user
            state.token = action.payload?.token
        },
        [getMe.rejected]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },
    }
})

export const checkIsAuth = (state) => Boolean(state.auth.token)

export const { logout } = authSlice.actions

export default authSlice.reducer