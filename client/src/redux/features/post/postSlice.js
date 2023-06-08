import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "../../../utils/axios"

const initialState = {
    posts: [],
    popularPosts: [],
    isLoading: false,
}

export const createPost = createAsyncThunk('posts/createPost', async(params) => {
    try {
        const {data} = await axios.post('/posts', params)
        return data
    } catch (err) {
        console.log(err)
    }
})

export const removePost = createAsyncThunk('posts/removePost', async(id) => {
    try {
        const {data} = await axios.delete(`/posts/${id}`, id)
        return data
    } catch (err) {
        console.log(err)
    }
})

export const updatePost = createAsyncThunk('posts/updatePost', async(updatedPost) => {
    try {
        const {data} = await axios.put(`/posts/${updatedPost.id}`, updatedPost)
        return data
    } catch (err) {
        console.log(err)
    }
})

export const getAllPosts = createAsyncThunk('posts/getAllPosts', async() => {
    try {
        const {data} = await axios.get('/posts')
        return data
    } catch (err) {
        console.log(err)
    }
})

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
    },
    extraReducers: {
        // Создание поста
        [createPost.pending]: (state) => {
            state.loading = true
        },
        [createPost.fulfilled]: (state, action) => {
            state.loading = false
            state.posts.push(action.payload)
        },
        [createPost.rejected]: (state) => {
            state.loading = false
        },

        // Получение всех постов
        [getAllPosts.pending]: (state) => {
            state.loading = true
        },
        [getAllPosts.fulfilled]: (state, action) => {
            state.loading = false
            state.posts = action.payload.posts
            state.popularPosts = action.payload.popularPosts
        },
        [getAllPosts.rejected]: (state) => {
            state.loading = false
        },

        // Удаление поста
        [removePost.pending]: (state) => {
            state.loading = true
        },
        [removePost.fulfilled]: (state, action) => {
            state.loading = false
            state.posts = state.posts.filter((post) => post._id !== action.payload._id) // список постов "пересобирается" без удаленного поста
        },
        [removePost.rejected]: (state) => {
            state.loading = false
        },

        // Обновление поста
        [updatePost.pending]: (state) => {
            state.loading = true
        },
        [updatePost.fulfilled]: (state, action) => {
            state.loading = false
            const index = state.posts.findIndex((post) => post._id === action.payload.id) // поиск индекса измененного поста
            state.posts[index] = action.payload // замена данных по индексу
        },
        [updatePost.rejected]: (state) => {
            state.loading = false
        },
    }
})

export default postSlice.reducer
