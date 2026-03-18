import Navbar from "../components/navbar";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import Tasks from "../components/Tasks/Tasks";

export default function DashBoardPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <>
            <div className="min-h-screen flex dark:bg-gray-800 dark:text-white">
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                <div className="flex min-w-0 flex-1 flex-col">
                    <Navbar onMenuClick={() => setIsSidebarOpen((v) => !v)} />
                    <main className="flex-1 p-6">
                        <Tasks />
                    </main>
                </div>
            </div>
        </>
    )
}