import { useMemo, useState } from "react"
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
    const searchQuery = useSelector(
        (state) => state.search.query
    );

    const tasks = useSelector((state)=> state.task.tasks);
    const selectedProjectTasks = tasks.filter((task)=> task.project == selectedProject);

    const [filter, setFilter] = useState("all");
    const [sort, setSort] = useState("all");

    const priorityOrder = {
        high: 3,
        medium: 2,
        low: 1,
        "no-priority": 0
    };

    function handleSort(event) {
       setSort(event.target.value);
    }
    function handleFilter(event){
      setFilter(event.target.value);
    }
    const finalTasks = useMemo(() => {
        let temp = [...selectedProjectTasks];

        if (searchQuery.trim() !== "") {
            temp = temp.filter((task) =>
                task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                task.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (filter !== "all") {
            temp = temp.filter((task) => task.status === filter);
        }
        if (sort === "priority") {
            temp.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
        }
        if (sort === "dueDate") {
            temp.sort((a, b) => new Date(a.date) - new Date(b.date));
        }
        return temp;
    }, [selectedProjectTasks, filter, sort]);

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
                <div className="pt-4 flex justify-between sm:justify-end  gap-2 text-sm sm:text-base">
                <div className="flex items-center gap-2">
                        <div>
                            <h3>Filter By : </h3>
                        </div>
                        <div>
                        <select name="filter" id="filter" className="bg-slate-200 dark:bg-slate-600 rounded-xl px-4 py-2" value={filter} onChange={handleFilter}>
                            <option value="all">All</option>
                            <option value="todo">Todo</option>
                            <option value="in-progress">InProgress</option>
                            <option value="completed">Completed</option>
                        </select>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 ">
                        <div >
                            <h3>Sort By : </h3>
                        </div>
                        <div>
                        <select name="sort" id="sort" className="bg-slate-200 dark:bg-slate-600 rounded-xl px-4 py-2" value={sort} onChange={handleSort}>
                            <option value="all">All</option>
                            <option value="priority">Priority</option>
                            <option value="dueDate">DueDate</option>
                        </select>
                        </div>
                    </div>
                </div>
                {finalTasks.length > 0 ? 
                (<>
                {view === "List-view" && <ListView tasks={finalTasks}/>} 
                {view === "Board-view" && <KanbanBoardView tasks={finalTasks}/>}</>)
                    : <div className="text-2xl flex justify-center ">No Tasks Found ,Please Add New Task</div>
            }
            </main>
        </div>
    )
}