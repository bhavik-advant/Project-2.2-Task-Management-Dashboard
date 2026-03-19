import { useState } from "react";
import NewProjectForm from "./Project/NewProjectForm";
import ProjectList from "./Project/ProjectList";


export default function Sidebar({ isOpen, onClose }) {
    const [ formOpen , setFormOpen ] = useState(false);
    function handleClick(){
        setFormOpen(true);
    }
    function handleCloseForm() {
        setFormOpen(false);
    }
    return (
        <>
            {formOpen && <NewProjectForm onClose={handleCloseForm}/>}
            <aside className="hidden min-h-screen sticky top-0 h-screen w-64 flex-col border-r-2 border-gray-200 dark:border-gray-400 lg:flex">
                <div className="border-b-2 border-gray-200 dark:border-gray-400 h-18 ">
                <h1 className="p-4 text-xl font-semibold">Tasks Dashboard</h1>
                </div>

                <div className="min-h-0 flex-1 overflow-auto px-2">
                    <ProjectList />
                </div>

                <div className="mt-auto border-t border-gray-200 dark:border-gray-400 p-4">
                    <button type="button" className="button-blue w-full" onClick={handleClick}>
                        + Add New Project
                    </button>
                </div>
            </aside>
            <div
                className={`fixed inset-0 z-50 lg:hidden ${isOpen ? "" : "pointer-events-none"}`}
            >
                <div
                    className={`absolute inset-0 bg-black/40 transition-opacity ${isOpen ? "opacity-100" : "opacity-0"}`}
                    onClick={onClose}
                />
                <aside
                    className={`absolute left-0 top-0 flex h-full w-72 max-w-[85vw] flex-col bg-gray-100 dark:bg-gray-800 border-r-2 border-gray-100 dark:border-gray-400 shadow-2xl transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
                    role="dialog"
                >
                    <div className="flex items-center justify-between p-4">
                        <h1 className="font-semibold">Tasks Dashboard</h1>
                        
                        <button
                            type="button"
                            onClick={onClose}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gray-500 text-slate-100"
                            aria-label="Close sidebar"
                        >
                            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                                <path
                                    d="M6 6l12 12M18 6L6 18"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="min-h-0 flex-1 overflow-auto px-2">
                        <ProjectList />
                    </div>

                    <div className="mt-auto border-t border-gray-200 p-4">
                        <button type="button" className="button-blue w-full" onClick={handleClick}>
                            + Add New Project
                        </button>
                    </div>
                </aside>
            </div>
        </>
    )
    
}