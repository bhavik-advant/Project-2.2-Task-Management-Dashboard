import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { MdArrowBack } from "react-icons/md";


export default function TaskDetailsPage() {

    const params = useParams()
    const id = params.id;
    const navigate = useNavigate();

    const tasks = useSelector((state) => state.task.tasks)
    const task = tasks.filter((task) => task.id == id);

    function handleBackButton(){
        navigate('/dashboard')
    }

    return (
        <>
        <div className="pb-4">
            <button className="button-blue flex items-center gap-2" onClick={handleBackButton}><MdArrowBack />Back</button>
        </div>
            <div className="p-6  rounded-xl border-2 border-gray-200 text-black dark:bg-gray-800">
                <div>
                    <div className=" py-4 text-4xl border-b-2 dark:text-white border-gray-400 dark:border-gray-100/50 font-bold">
                        <h1>{task[0].title}</h1>
                    </div>
                </div>
                <div className=" dark:text-gray-200 py-4 text-2xl">
                    <h3>{task[0].description}</h3>
                </div>
                <div className="grid sm:grid-cols-2 text-xl py-2">
                    <div className="text-xl dark:text-gray-200">
                        <p><span className="font-semibold">Priority : </span>{task[0].priority}</p>
                    </div>
                    <div className="text-xl dark:text-gray-200">
                        <p><span className="font-semibold">Status : </span> {task[0].status}</p>
                    </div>
                    <div className="text-xl dark:text-gray-200">
                        <p><span className="font-semibold">Due Date : </span>{task[0].date}</p>
                    </div>
                </div>
            </div>
        </>
    )
}