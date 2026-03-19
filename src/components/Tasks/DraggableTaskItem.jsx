
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { TbGridDots } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export default function DraggableTaskItem({ item, handleEdit, handleDelete }) {

    const navigate = useNavigate();

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: item.id,
    });

    const style = {
        transform: CSS.Translate.toString(transform),
    };
    function handleTaskClick(id) {
        navigate("/dashboard/" + id)
    }

    return (
        <li
            ref={setNodeRef}
            style={style}
            className="p-2 bg-gray-200 rounded-lg m-2 text-slate-900 "
        >
            <div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center text-lg p-1">
                        <span
                            {...listeners}
                            {...attributes}
                            className="cursor-grab" >
                            <TbGridDots />
                        </span>
                    </div>
                    <div className="flex gap-2 items-center">

                        <button
                            className="button-edit"
                            onClick={() => handleEdit(item.id)}
                        >
                            <MdModeEdit />
                        </button>

                        <button
                            className="button-delete"
                            onClick={() => handleDelete(item.id)}
                        >
                            <MdDelete />
                        </button>
                    </div>
                </div>
                <div className="cursor-pointer" onClick={() => handleTaskClick(item.id)}>
                    <div className="flex justify-between items-center" >
                        <h2 className="text-2xl font-medium">{item.title}</h2>
                    </div>
                    <div className="xl:flex xl:justify-between pt-2">
                        <div>{item.priority}</div>
                        <div>Due Date : {item.date}</div>
                    </div>
                </div>
            </div>
        </li>
    );
}