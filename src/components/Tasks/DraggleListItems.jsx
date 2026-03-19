import { useDraggable } from "@dnd-kit/core";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { TbGridDots } from "react-icons/tb";
import { CSS } from "@dnd-kit/utilities";
import { useNavigate } from "react-router-dom";

export default function DraggableListItem({ item, handleEdit, handleDelete }) {
    const navigate = useNavigate();

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: item.id,
    });

    const style = {
        transform: CSS.Translate.toString(transform),
    };

    function handleTaskClick(id){
        navigate("/" + id)       
    }

    return (
        <>
            <li key={item.id} ref={setNodeRef} style={style}
                className="p-2 bg-white text-slate-900 rounded-lg m-2 ">
                <div className="flex justify-between">
                    <div className="flex items-center" >
                        <div className="flex items-center text-lg p-1 pr-2">
                            <span
                                {...listeners}
                                {...attributes}
                                className="cursor-grab" >
                                <TbGridDots />
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-between w-full px-4 cursor-pointer" onClick={() => handleTaskClick(item.id)}>
                        <div>
                            {item.title}
                        </div>
                        <div className="sm:flex gap-4 hidden ">
                            <div>
                                {item.priority}
                            </div>
                            <div>
                                {item.date}
                            </div>
                        </div>
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

        </>
    )
}