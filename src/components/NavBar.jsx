import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { checkIsAuth, logOut } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const NavBar = () => {
    const dispatch = useDispatch();

    const isAuth = useSelector(checkIsAuth);

    const activeStyles = {
        color: "white",
    };

    const handleLogOut = () => {
        dispatch(logOut());
        localStorage.removeItem("token");
        toast("Log out");
    };

    const setActiveClass = ({ isActive }) => (isActive ? activeStyles : undefined);

    return (
        <div className="flex py-4 justify-between items-center">
            <span className="flex justify-center items-center w-6 h-6 bg-gray-600 text-xs text-white rounded-sm">
                R
            </span>
            {isAuth && (
                <ul className=" ml-4 flex gap-8">
                    <li>
                        <NavLink
                            to="/"
                            className="text-xs text-gray-400 hover:text-white"
                            style={setActiveClass}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/posts"
                            className="text-xs text-gray-400 hover:text-white"
                            style={setActiveClass}
                        >
                            My Posts
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/new"
                            className="text-xs text-gray-400 hover:text-white"
                            style={setActiveClass}
                        >
                            Add Post
                        </NavLink>
                    </li>
                </ul>
            )}

            <div className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2">
                {isAuth ? (
                    <button onClick={handleLogOut}>Log out</button>
                ) : (
                    <Link to="/login">Log in</Link>
                )}
            </div>
        </div>
    );
};

export default NavBar;
