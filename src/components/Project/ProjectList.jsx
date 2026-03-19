import { useDispatch, useSelector } from "react-redux";
import { deleteProject, setSelectedProject } from "../../store/slices/projectSlice";
import { MdDelete } from "react-icons/md";
import { deleteTaskByProject } from "../../store/slices/taskSlice";
import { useNavigate } from "react-router-dom";

export default function ProjectList() {
    const projects = useSelector((state) => state.project.projects);
    const navigate = useNavigate()

    const selectedProject = useSelector(
        (state) => state.project.selectedProject
    );

    const dispatch = useDispatch();

    function handleClick(id) {
        dispatch(setSelectedProject(id));
        navigate('/dashboard');

    }
    function handleDelete(id) {
        dispatch(deleteProject(id));
        dispatch(deleteTaskByProject(id));
        dispatch(setSelectedProject("project-my-org"));
    }

    return (
        <ul className="p-4">
            {projects.map((p) => {
                const isSelected = selectedProject === p.id;

                const classes = `p-2 mb-2 rounded-xl font-semibold w-full text-left cursor-pointer flex justify-between 
                    ${isSelected ? "bg-blue-500 text-white" : "bg-blue-200/50"}`;

                return (
                    <li key={p.id} >
                        <div className={classes}>
                            <div>
                                <button
                                    onClick={() => handleClick(p.id)} >
                                    {p.title}
                                </button>
                            </div>
                            <div >
                                <button className="button-delete" onClick={() => handleDelete(p.id)}><MdDelete /></button>
                            </div>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}