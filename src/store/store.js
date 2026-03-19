import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice'
import taskReducer from './slices/taskSlice'
import projectReducer from './slices/projectSlice'
import themeReducer from './slices/themeSlice'
import searchReducer from './slices/searchSlice'

export const store = configureStore({
    reducer : {
        auth : authReducer,
        task : taskReducer,
        project : projectReducer,
        theme : themeReducer,
        search : searchReducer,
    }
})