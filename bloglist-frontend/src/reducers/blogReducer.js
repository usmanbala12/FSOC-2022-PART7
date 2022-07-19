/* eslint-disable indent */
import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const initialState = []

const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        setBlogs(state, action){
            return action.payload
        },
        appendBlog(state, action){
            state.push(action.payload)
        },
        deleteBlog(state, action){
            return state.filter(item => item.id !== action.payload.id)
        },
        likeBlog(state, action){
            const tolike = state.find(item => item.id === action.payload)
            const liked = { ...tolike, likes: tolike.likes + 1 }
            return state.map(item => item.id !== action.payload ? item : liked)
        },
        addComment(state, action){
            return state.map(item => item.id !== action.payload.id ? item : action.payload)
        }
    }
})

export const { setBlogs, appendBlog, deleteBlog, likeBlog, addComment } = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const response = await blogService.getAll()
        response.sort((a, b) => b.likes - a.likes)
        dispatch(setBlogs(response))
    }
}

export const addBlog = (data) => {
    return async dispatch => {
        const response = await blogService.create(data)
        dispatch(appendBlog(response))
        dispatch(setNotification({ message: `a new blog ${response.title} has been added`, type: 'success' }, 5000))
    }
}

export const likeBLOG = (blog) => {
    return async dispatch => {
        dispatch(likeBlog(blog.id))
        await blogService.update(blog)
    }
}

export const commentBlog = (data) => {
    return async dispatch => {
        await blogService.update(data)
        dispatch(addComment(data))
    }
}

export default blogSlice.reducer