import { createSlice } from "@reduxjs/toolkit";

function getTheme(){
    return localStorage.getItem('theme') || "light";
}

const themeSlice = createSlice({
    name : 'theme',
    initialState : {
        mode : getTheme(),
    },
    reducers : {
        toggleTheme(state){
            state.mode = state.mode ===  "light" ? "dark" : "light";
            localStorage.setItem('theme' , state.mode)
        }
    }
})

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;