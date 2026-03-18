

import ListViewItems from "./ListViewItems";
export default function ListView({ tasks }) {

    const inProgressTask = tasks.filter((task) => task.status === "in-progress")
    const todoTask = tasks.filter((task) => task.status === "todo")
    const completedTask = tasks.filter((task) => task.status === "completed")
    return (
        <>
            <div className="flex-1 bg-gray-400 rounded-xl mt-10">
                <div className="bg-gray-500 p-4 rounded-t-xl">
                    <h1 className="text-white">inProgress</h1>
                </div>
                <div className="p-4">
                    <ul >
                        <ListViewItems tasks={inProgressTask} />
                    </ul>
                </div>
            </div>
            <div className="flex-1 bg-teal-500 rounded-xl mt-10">
                <div className="bg-teal-700 p-4 rounded-t-xl">
                    <h1 className="text-white">todo</h1>
                </div>
                <div className="p-4">
                    <ul >
                        <ListViewItems tasks={todoTask} />
                    </ul>
                </div>
            </div>
            <div className="flex-1 bg-amber-400 rounded-xl mt-10">
                <div className="bg-amber-500 p-4 rounded-t-xl">
                    <h1>completed</h1>
                </div>
                <div className="p-4">
                    <ul >
                        <ListViewItems tasks={completedTask} />
                    </ul>
                </div>
            </div>
        </>
    )
}