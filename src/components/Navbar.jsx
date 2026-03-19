import { useDispatch, useSelector } from "react-redux"
import { logout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { setSearchQuery } from "../store/slices/searchSlice";

export default function Navbar({ onMenuClick }) {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogout() {
        dispatch(logout());
        navigate('/login')
    }


    function handleSearch(e) {
        dispatch(setSearchQuery(e.target.value));
    }

    return (
        <>
            <div className="p-4 sticky top-0 backdrop-blur-md flex w-full items-center justify-between gap-4 border-b-2 h-18 border-gray-200 dark:border-gray-400">
                <div className="flex min-w-0 items-center gap-3">
                    <button
                        type="button"
                        onClick={onMenuClick}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 lg:hidden"
                    >
                        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
                            <path
                                d="M4 6h16M4 12h16M4 18h16"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                    <input type="text" className="lg:min-w-[550px] w-[180px] sm:w-[300px] bg-gray-100 rounded px-4 py-2 dark:text-gray-800" placeholder="Search.." onChange={handleSearch} />
                </div>
                <div className="flex items-center gap-4">
                    <div >
                        <ThemeToggle />
                    </div>
                    <div>
                        {isAuthenticated ? (
                            <button className="button-blue" onClick={handleLogout}>Logout</button>
                        ) : (
                            <button className="button-blue">Login</button>
                        )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}