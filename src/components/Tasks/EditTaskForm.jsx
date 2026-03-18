import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateTask } from "../../store/slices/taskSlice";
export default function EditTaskForm({ onClose , selectedItemId }) {
    const dialogRef = useRef(null);
    useEffect(() => {
        if (!dialogRef.current) return;
        if (typeof dialogRef.current.showModal === "function") {
            dialogRef.current.showModal();
        }
        return () => {
            try {
                dialogRef.current?.close();
            } catch {}
        };
    }, []);

    const projects = useSelector((state)=> state.project.projects);
    const tasks = useSelector((state)=> state.task.tasks);
    const selectedTask = tasks.filter((task) => task.id === selectedItemId)
    const dispatch = useDispatch();

    function handleSubmit(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const title = fd.get("title")
        const description = fd.get("description")
        const priority = fd.get("priority")
        const date = fd.get("date")
        const project = fd.get("project")
        const status = fd.get("status")
        const task = {
            title,
            description,
            priority,
            date,
            project,
            status,
            updatedAt : Date.now(), 
        }
        dispatch(UpdateTask({
            id : selectedItemId,
            updatedTask : task,
        }));
        onClose?.();
    }
    return (
        <dialog ref={dialogRef} onClose={onClose} onCancel={(e) => {
                e.preventDefault();
                onClose?.();
            }}
            className="fixed left-1/2 top-1/2 w-full xl:w-[30vw] -translate-x-1/2 -translate-y-1/2 rounded-3xl p-0 backdrop:bg-black/50 max-h-[85vh] overflow-auto">
            <div className="rounded-3xl bg-white dark:bg-gray-700 p-6 shadow-2xl sm:p-8">
                <div className="mb-6 flex items-center justify-between gap-4">
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Edit Task</h2>
                    <button type="button"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
                        onClick={() => onClose?.()} >
                        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" >
                            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="form-label">Title</label>
                        <input type="text" name="title" placeholder="Enter title" required className="form-input" defaultValue={selectedTask[0].title} />
                    </div>
                    <div>
                        <label className="form-label">Description</label>
                        <textarea name="description" placeholder="Describe task here" required rows={4} className="form-input " defaultValue={selectedTask[0].description}/>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label className="form-label">Priority</label>
                            <select name="priority" id="priority" defaultValue={selectedTask[0].priority} className="form-input" >
                                <option value="no-priority">No Priority</option>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                        </div>
                        <div>
                            <label className="form-label">Due date</label>
                            <input type="date" name="date" required className="form-input" defaultValue={selectedTask[0].date}/>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label className="form-label">Project</label>
                            <select name="project" id="project" defaultValue={selectedTask[0].project} className="form-input" >
                                {projects.map((p)=>(
                                    <option key={p.id} value={p.id}>{p.title}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="form-label">Status</label>
                            <select name="status"id="status" defaultValue={selectedTask[0].status} className="form-input">
                                <option value="todo">Todo</option>
                                <option value="in-progress">InProgress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-3 pt-2">
                        <button type="button" onClick={() => onClose?.()}
                            className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer" >
                            Cancel
                        </button>
                        <button type="submit" className="button-blue">Update task</button>
                    </div>
                </form>
            </div>
        </dialog>
    )
}