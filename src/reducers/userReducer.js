import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: 'user',
    initialState: { 
        username: "",
        password: "",
        user: null
    },
    reducers: {
        setUser(state, action) {
            return {
                username: "",
                password: "",
                user: action.payload
            }
        },
        clearUser(state, action) {
            return {
                username: "",
                password: "",
                user: null
            }
        },
        setUsername(state, action) {
            return {...state, username: action.payload}
        },
        setPassword(state, action) {
            return {...state, password: action.payload}
        }
    }
})

export const { setUser, clearUser, setPassword, setUsername } = userSlice.actions
export default userSlice.reducer