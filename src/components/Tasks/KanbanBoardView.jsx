import KanbanViewItems from "./KanbanViewItems";

export default function KanbanBoardView({ tasks }) {
    const inProgressTask = tasks.filter((task) => task.status === "in-progress")
    const todoTask = tasks.filter((task) => task.status === "todo")
    const completedTask = tasks.filter((task) => task.status === "completed")
    return (
        <>
            <div className="grid sm:grid-cols-3 gap-4 pt-4">
                <div className="bg-amber-400 rounded-xl">
                    <div className="p-2 font-semibold text-2xl text-white">Todo</div>
                    <div>
                        <ul>
                            <KanbanViewItems tasks={todoTask} />
                        </ul>
                    </div>
                </div>
                <div className="bg-amber-600 rounded-xl">
                    <div className="p-2 font-semibold text-2xl text-white">inProgress</div>
                    <div>
                        <ul>
                            <KanbanViewItems tasks={inProgressTask} />
                        </ul>
                    </div>
                </div>
                <div className="bg-teal-500 rounded-xl">
                    <div className="p-2 font-semibold text-2xl text-white">Completed</div>
                    <div>
                        <ul>
                            <KanbanViewItems tasks={completedTask} />
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}