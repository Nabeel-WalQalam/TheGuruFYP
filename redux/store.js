import { configureStore } from '@reduxjs/toolkit'
import chatReducer from './reducers/chat-reducer'
import userReducer from './reducers/user-reducer'

export default configureStore({
    reducer: {
        userReducer: userReducer,
        chatReducer: chatReducer,
    }
})