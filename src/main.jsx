import './index.css'

import App from './App'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom/client'
import blogReducer from './reducers/blogReducer'
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'

//const store = configureStore({
//    reducer: {
//        notification: notificationReducer
//    }
//})

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogReducer,
        user: userReducer
    }
})

console.log('store:', store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)
