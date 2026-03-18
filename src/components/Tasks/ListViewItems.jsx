import { useState } from "react";
import EditTaskForm from "./EditTaskForm";
import { useDispatch } from "react-redux";
import { deleteTask } from '../../store/slices/taskSlice'
import DraggableListItem from "./DraggleListItems";
import { useDroppable } from "@dnd-kit/core";

export default function ListViewItems({ icon, id, title, tasks }) {

    const { setNodeRef } = useDroppable({
        id: id,
    });

    const [formOpen, setFormOpen] = useState(false);
    const [itemId, setItemId] = useState();

    const dispatch = useDispatch();

    function handleEdit(id) {
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
        <div ref={setNodeRef} className="rounded-xl">
            {formOpen && <EditTaskForm onClose={handleClose} selectedItemId={itemId} />}

            <div className="flex-1 dark:bg-gray-400 bg-slate-200 rounded-xl mt-10">
                <div className="dark:bg-gray-500 bg-slate-400 p-4 rounded-t-xl flex items-center gap-4" >
                    <div className="text-white">
                        {icon}
                    </div>
                    <div>
                        <h1 className="text-white">{title}</h1>
                    </div>
                </div>
                <div className="p-4">
                    <ul >
                        {tasks.map((item) => (
                            <DraggableListItem key={item.id}
                                item={item}
                                icon={icon}
                                handleEdit={handleEdit}
                                handleDelete={handleDelete} />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}