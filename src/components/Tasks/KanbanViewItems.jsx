import { useState } from "react";
import EditTaskForm from "./EditTaskForm";
import { useDispatch } from "react-redux";
import { deleteTask } from '../../store/slices/taskSlice'
import { useDroppable } from "@dnd-kit/core";
import DraggableTaskItem from "./DraggableTaskItem";

export default function KanbanViewItems({ icon , id, title, tasks, bg }) {

    const { setNodeRef } = useDroppable({
        id: id, 
    });

    const [formOpen, setFormOpen] = useState(false);
    const [itemId, setItemId] = useState();

    const dispatch = useDispatch();

    function handleEdit(id) {
        console.log("edit clicked!");

        setItemId(id);
        setFormOpen(true);
    }

    function handleClose() {
        setFormOpen(false);
    }

    function handleDelete(id) {
        dispatch(deleteTask(id))
    }

    return (
        <div ref={setNodeRef} className={`${bg} rounded-xl`}>
            {formOpen && <EditTaskForm onClose={handleClose} selectedItemId={itemId} />}
            <div className="p-2 font-semibold text-2xl text-white flex items-center gap-4">
                <div>
                    {icon}
                </div>
                <div >
                    {title}
                </div>
            </div>
            <ul>
                {tasks.map((item) => (
                    <DraggableTaskItem
                        key={item.id}
                        item={item}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                ))}
            </ul>
        </div>
    );
}
