import { useState } from "react"
import ListView from "./ListView";
import KanbanBoardView from "./KanbanBoardView";
import NewTaskForm from "./NewTaskForm";

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

    return (
        <div>
            {formOpen && <NewTaskForm onClose={handleCloseForm} />}
            <div className="p-4 border-2 border-slate-300 rounded-2xl grid sm:grid-cols-2 grid-cols-1 justify-between ">
                <div>
                    <h1 className="text-4xl font-semibold">Tasks</h1>
                </div>
                <div className="flex sm:justify-end pt-4 sm:pt-0 ">
                    <div>
                        <select name="view" id="view" className="bg-slate-200 rounded-xl px-4 py-2" onChange={handleViewChange}>
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
                {view === "List-view" && <ListView /> }
                {view === "Board-view" && <KanbanBoardView />}
            </main>
        </div>
    )

}