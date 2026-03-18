
import { DndContext, closestCorners } from "@dnd-kit/core";
import { useDispatch } from "react-redux";
import { updateTaskStatus } from "../../store/slices/taskSlice";
import KanbanViewItems from "./KanbanViewItems";
import { FaRegCircle } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { FaCheckCircle } from "react-icons/fa";

export default function KanbanBoardView({ tasks }) {

    const dispatch = useDispatch();

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over) return;

        const taskId = Number(active.id);
        const newStatus = over.id;

        dispatch(updateTaskStatus({
            taskId,
            status: newStatus
        }));
    };

    const inProgressTask = tasks.filter((task) => task.status === "in-progress");
    const todoTask = tasks.filter((task) => task.status === "todo");
    const completedTask = tasks.filter((task) => task.status === "completed");

    return (
        <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
            <div className="grid sm:grid-cols-3 gap-4 pt-4">

                <KanbanViewItems id="todo" title="Todo" tasks={todoTask} bg="bg-slate-400 dark:bg-blue-100/50" icon={<FaRegCircle /> }/>

                <KanbanViewItems id="in-progress" title="In Progress" tasks={inProgressTask} bg="bg-slate-400 dark:bg-blue-100/50" icon={<GrInProgress />}/>

                <KanbanViewItems id="completed" title="Completed" tasks={completedTask} bg="bg-slate-400 dark:bg-blue-100/50" icon={<FaCheckCircle />}/>

            </div>
        </DndContext>
    );
}