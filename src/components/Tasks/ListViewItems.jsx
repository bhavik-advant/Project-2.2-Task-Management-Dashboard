import { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import EditTaskForm from "./EditTaskForm";
import { useDispatch } from "react-redux";
import { deleteTask } from '../../store/slices/taskSlice'
export default function ListViewItems({ tasks }) {
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
    function handleDelete(id){
        dispatch(deleteTask(id))
    }
    return (
        <>
            {formOpen && <EditTaskForm onClose={handleClose} selectedItemId={itemId}/>}
            {tasks.map((item) => (
                <li key={item.id} className="p-2 bg-gray-200 text-slate-900 rounded-lg m-2">
                    <div className="flex justify-between">
                        <div>
                            {item.title}
                        </div>
                        <div className="flex gap-2">
                            <div >
                                <button className="button-edit" onClick={() => handleEdit(item.id)}><MdModeEdit /></button>
                            </div>
                            <div >
                                <button className="button-delete" onClick={() => handleDelete(item.id)}><MdDelete /></button>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </>
    )
}