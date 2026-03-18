import { createSlice } from "@reduxjs/toolkit";

const loadTasksFromStorage = () => {
    try {
        const data = localStorage.getItem("tasks");
        return data ? JSON.parse(data) : [];
    } catch (error) {
        return [];
    }
};

const initialState = {
    tasks: loadTasksFromStorage(),
};

const taskSlice = createSlice({
    name : "task",
    initialState,
    reducers : {
        addTask(state , action){
            const payload = action.payload;
            state.tasks.push(payload);
            localStorage.setItem("tasks", JSON.stringify(state.tasks));
        },
        UpdateTask(state, action){
            const { id , updatedTask } = action.payload;
            
            const taskIndex = state.tasks.findIndex((task)=> task.id === id )

            if(taskIndex !== -1 ){
                state.tasks[taskIndex] = {
                    ...state.tasks[taskIndex],
                    ...updatedTask,
                };
                localStorage.setItem("tasks", JSON.stringify(state.tasks));
            }
        },
        deleteTask(state , action){
            const id = action.payload;
            state.tasks = state.tasks.filter((task) => task.id !== id )
            localStorage.setItem("tasks", JSON.stringify(state.tasks));
        },
        deleteTaskByProject(state , action){
            const id = action.payload;
            state.tasks = state.tasks.filter((task) => task.id !== id )
            localStorage.setItem("tasks", JSON.stringify(state.tasks));
        },
        updateTaskStatus: (state, action) => {
            const { taskId, status } = action.payload;
        
            const index = state.tasks.findIndex(t => t.id === taskId);
        
            if (index !== -1) {
                state.tasks[index] = {
                    ...state.tasks[index],
                    status: status
                };
            }
            localStorage.setItem("tasks", JSON.stringify(state.tasks));
        }
    }
})

export const { addTask , UpdateTask , deleteTask , deleteTaskByProject ,updateTaskStatus } = taskSlice.actions;
export default taskSlice.reducer;