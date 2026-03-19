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
        navigate("/");
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
                                className="form-input"
                            />
                        </div>

                        <button className="w-full rounded-2xl py-3 font-semibold bg-[#90dad7] text-[#00393b] cursor-pointer shadow-lg">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}