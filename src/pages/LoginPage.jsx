import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SelectAuth, checkIsAuth, loginUser } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { status } = useSelector(SelectAuth);
    const isAuth = useSelector(checkIsAuth);

    useEffect(() => {
        if (status) {
            toast(status);
        }
        if (isAuth) {
            navigate("/");
        }
    }, [status, isAuth, navigate]);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => {
        try {
            dispatch(loginUser({ username, password }));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={(e) => e.preventDefault()} className="w-1/4 h-60 mx-auto mt-40">
            <h1 className="text-lg text-white text-center">Login</h1>
            <label htmlFor="" className="text-xs text-gray-400">
                Username:
                <input
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                    type="text"
                    placeholder="Username..."
                    className="mt-1 text-black w-full  rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
                />
            </label>

            <label htmlFor="" className="text-xs text-gray-400">
                Password:
                <input
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    type="password"
                    placeholder="Password..."
                    className="mt-1 text-black w-full  rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
                />
            </label>
            <div className="flex gap-8 justify-center mt-4">
                <button
                    onClick={handleSubmit}
                    type="submit"
                    className="flex justify-center items-center text-xs bg-gray-600  text-white rounded-sm py-2 px-4"
                >
                    Log in
                </button>
                <Link
                    to="/register"
                    className="flex justify-center items-center text-xs text-white"
                >
                    Dont have account?
                </Link>
            </div>
        </form>
    );
};

export default LoginPage;
