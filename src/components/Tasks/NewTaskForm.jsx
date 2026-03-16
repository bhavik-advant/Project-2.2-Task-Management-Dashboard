import { useEffect, useRef } from "react";

export default function NewTaskForm({ onClose }) {
    const dialogRef = useRef(null);

    useEffect(() => {
        if (!dialogRef.current) return;
        if (typeof dialogRef.current.showModal === "function") {
            dialogRef.current.showModal();
        }

        return () => {
            try {
                dialogRef.current?.close();
            } catch {

            }
        };
    }, []);

    function handleSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);

        const title = fd.get("title")
        const description = fd.get("description")
        const priority = fd.get("priority")
        const date = fd.get("date")
        const project = fd.get("project")

        const task = {
            title,
            description,
            priority,
            date,
            project
        }
        console.log(task);
        onClose?.();

    }
    return (
        <dialog
            ref={dialogRef}
            onClose={onClose}
            onCancel={(e) => {
                e.preventDefault();
                onClose?.();
            }}
            className="fixed left-1/2 top-1/2 min-w-[30vw] -translate-x-1/2 -translate-y-1/2 rounded-3xl p-0 backdrop:bg-black/50 max-h-[85vh] overflow-auto"
        >
            <div className="rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
                <div className="mb-6 flex items-center justify-between gap-4">
                    <h2 className="text-xl font-semibold text-slate-900">New Task</h2>
                    <button
                        type="button"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
                        onClick={() => onClose?.()}
                    >
                        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" >
                            <path
                                d="M6 6l12 12M18 6L6 18"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="form-label">Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter title"
                            required
                            className="form-input"
                        />
                    </div>

                    <div>
                        <label className="form-label">Description</label>
                        <textarea
                            name="description"
                            placeholder="Describe task here"
                            required
                            rows={4}
                            className="form-input "
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label className="form-label">Priority</label>
                            <select
                                name="priority"
                                id="priority"
                                defaultValue="no-priority"
                                className="form-input "
                            >
                                <option value="no-priority">No Priority</option>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                        </div>

                        <div>
                            <label className="form-label">Due date</label>
                            <input
                                type="date"
                                name="date"
                                required
                                className="form-input "
                            />
                        </div>
                    </div>
                    <div>
                        <label className="form-label">Project</label>
                        <select
                            name="project"
                            id="project"
                            defaultValue="my-organization"
                            className="form-input "
                        >
                            <option value="my-organization">My Organization</option>

                        </select>
                    </div>
                    <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => onClose?.()}
                            className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="button-blue"
                        >
                            Create task
                        </button>
                    </div>
                </form>
            </div>
        </dialog>

    )
}