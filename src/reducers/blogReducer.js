import { createSlice } from "@reduxjs/toolkit"

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        addBlog(state, action) {
            return [...state, action.payload]
        },
        setBlogs(state, action) {
            return action.payload
        },
        removeBlog(state, action) {
            return state.filter(blog => blog.id !== action.payload)
        },
        updateBlog(state, action) {
            return state.map(blog => blog.id === action.payload.id ? action.payload : blog)
        },
        initializeBlogs(state, action) {
            return action.payload
        }
    }
})

export const { addBlog, setBlogs, removeBlog, updateBlog, initializeBlogs } = blogSlice.actions
export default blogSlice.reducer