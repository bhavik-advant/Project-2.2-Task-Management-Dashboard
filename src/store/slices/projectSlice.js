import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_PROJECT = {
    id: "project-my-org",
    title: "My Organization",
    createdAt: new Date().toISOString()
};

const loadProjectsFromStorage = () => {
    try {
        const data = localStorage.getItem("projects");
        let parsed = data ? JSON.parse(data) : [];

        const exists = parsed.some(
            project => project.id === "project-my-org"
        );
        if (!exists) {
            parsed.push(DEFAULT_PROJECT);
        }
        localStorage.setItem("projects", JSON.stringify(parsed));

        return parsed;
    } catch (error) {
        const fallback = [DEFAULT_PROJECT];
        localStorage.setItem("projects", JSON.stringify(fallback));
        return fallback;
    }
};
const initialState = {
    projects: loadProjectsFromStorage(),
    selectedProject : 'project-my-org',
};


const projectSlice = createSlice({
    name : "project",
    initialState,
    reducers : {
        addProject(state , action){
            const payload= action.payload;
            state.projects.push(payload);
            localStorage.setItem("projects", JSON.stringify(state.projects));
        },
        setSelectedProject(state, action) {
            state.selectedProject = action.payload;
        },
        deleteProject(state , action){
            const id = action.payload;
            state.projects = state.projects.filter((p) => p.id !== id )
            localStorage.setItem("projects", JSON.stringify(state.projects));
        }
    }
})

export const { addProject , setSelectedProject , deleteProject } = projectSlice.actions;
export default projectSlice.reducer;