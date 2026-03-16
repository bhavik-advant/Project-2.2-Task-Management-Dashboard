import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target)
        const email = fd.get("email")

        const user = {
            id: Date.now(),
            email
        }
        dispatch(login(user));
        navigate("/dashboard");
    }
    
    return (
        <>
            <div className="relative min-h-screen">
                <img
                    src="/login-bg.jpg"
                    alt="Login background"
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="relative flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
                    <form
                        onSubmit={handleSubmit}
                        className="w-full max-w-md rounded-3xl p-6 shadow-2xl shadow-black/40 backdrop-blur sm:p-8"
                    >
                        <div className="text-3xl font-semibold text-center mb-6 text-[#012729] sm:text-4xl">
                            Login
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="mb-2 block px-1 text-sm font-medium text-slate-700">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                required
                                className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-slate-900 outline-none transition focus:border-indigo-400/60 focus:ring-4 focus:ring-indigo-500/15"
                            />
                        </div>

                        <button className="w-full rounded-2xl  py-3 font-semibold bg-[#90dad7] text-white cursor-pointer shadow-lg focus:outline-none focus:ring-4 focus:ring-cyan-400/20 active:brightness-95">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}