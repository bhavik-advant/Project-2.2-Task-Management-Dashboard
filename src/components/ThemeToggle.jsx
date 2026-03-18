import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../store/slices/themeSlice";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";

export default function ThemeToggle() {
    const dispatch = useDispatch();
    const mode = useSelector((state)=> state.theme.mode);
    
    function handleToggle(){
        const html = document.documentElement;
        if(mode === 'light'){
            html.classList.add('dark');
        }else{
            html.classList.remove('dark');
        }
        dispatch(toggleTheme());
    }
    return (
        <button onClick={handleToggle} className="bg-gray-200 dark:bg-gray-700 justify-center text-xl rounded-lg p-2 cursor-pointer">
            {mode === "light" ? <MdDarkMode /> : <MdOutlineLightMode className="text-white"/>}
        </button>
    ) 
}