import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";

export default function LoginPage() {
    console.log("loginpage");
    
    const dispatch = useDispatch()

    function handleSubmit(event){
        event.preventDefault();

        const fd = new FormData(event.target)
        const email  = fd.get("email")

        const user = {
            id : Date.now(),
            email
        }
        dispatch(login(user));
    }
    return (
        <div className="bg-amber-300">
            <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Enter your email" name="email"/>
            <button>Login</button>
            </form>
        </div>
    )
}