import ListViewItems from "./ListViewItems";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { useDispatch } from "react-redux";
import { updateTaskStatus } from "../../store/slices/taskSlice";
import { FaRegCircle } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { FaCheckCircle } from "react-icons/fa";

export default function ListView({ tasks }) {

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

    const inProgressTask = tasks.filter((task) => task.status === "in-progress")
    const todoTask = tasks.filter((task) => task.status === "todo")
    const completedTask = tasks.filter((task) => task.status === "completed")
    return (
        <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
            {inProgressTask.length > 0 && 
                <ListViewItems id="in-progress" title="InProgress" tasks={inProgressTask}  icon={<GrInProgress />}/>
            }
            {todoTask.length > 0 && 
                <ListViewItems id="todo" title="Todo" tasks={todoTask} icon={<FaRegCircle />}/>
            }
            {completedTask.length > 0 && 
                <ListViewItems id="completed" title="Completed" tasks={completedTask} icon={<FaCheckCircle />}/>
            }
        </DndContext>
    )
}