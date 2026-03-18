import { useState } from "react"
import ListView from "./ListView";
import KanbanBoardView from "./KanbanBoardView";
import NewTaskForm from "./NewTaskForm";
import { useSelector } from "react-redux";

export default function Tasks() {

    const [view, setView] = useState('List-view');
    function handleViewChange(event) {
        setView(event.target.value);
    }
    const [ formOpen , setFormOpen ] = useState(false);
    function handleClick(){
        setFormOpen(true);
    }
    function handleCloseForm() {
        setFormOpen(false);
    }

    const selectedProject = useSelector(
        (state) => state.project.selectedProject
    );

    const tasks = useSelector((state)=> state.task.tasks);
    const selectedProjectTasks = tasks.filter((task)=> task.project == selectedProject);

    return (
        <div>
            {formOpen && <NewTaskForm onClose={handleCloseForm} />}
            <div className="p-4 border-2 border-slate-300 dark:border-gray-400 rounded-2xl grid sm:grid-cols-2 grid-cols-1 justify-between ">
                <div>
                    <h1 className="text-4xl font-semibold">Tasks</h1>
                </div>
                <div className="flex sm:justify-end pt-4 sm:pt-0 ">
                    <div >
                        <select name="view" id="view" className="bg-slate-200 dark:bg-slate-600 rounded-xl px-4 py-2" onChange={handleViewChange}>
                            <option value="List-view" defaultValue={view}>List View</option>
                            <option value="Board-view">Board View</option>
                        </select>
                    </div>
                    <div className="ml-4">
                        <button type="button" className="button-blue " onClick={handleClick}>+ Add New Task</button>
                    </div>
                </div>
            </div>
            <main>
                {view === "List-view" && <ListView tasks={selectedProjectTasks}/> }
                {view === "Board-view" && <KanbanBoardView tasks={selectedProjectTasks}/>}
            </main>
        </div>
    )
}