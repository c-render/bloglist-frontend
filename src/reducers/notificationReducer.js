import { createSlice } from "@reduxjs/toolkit"

//const notificationReducer = (state = null, action) => {
//    switch (action.type) {
//      case 'SET_NOTIFICATION':
//        return action.data
//      case 'CLEAR_NOTIFICATION':
//        return null
//      default:
//        return state
//    }
//  }

//export const setNotificationMessage = (message) => {
//    return {
//      type: 'SET_NOTIFICATION',
//      data: message
//    }
//  }

//export const clearNotificationMessage = () => {
//    return {
//      type: 'CLEAR_NOTIFICATION'
//    }
//  }

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setNotificationMessage(state, action) {
            return action.payload
        },
        clearNotificationMessage(state, action) {
            return null
        }
    }
})

export const { setNotificationMessage, clearNotificationMessage } = notificationSlice.actions
export default notificationSlice.reducer