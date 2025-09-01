import { useEffect, useState } from "react"
import LoginModal from './LoginModal'
import { useAuth } from "../Context/AuthProvider";
import Logout from "./Logout";
import { BsPersonCircle, BsCart3, BsGearFill, BsCartFill, BsGear } from 'react-icons/bs';
import { Link, useLocation } from "react-router-dom";


export default function Navbar() {
    const [authUser, setAuthUser] = useAuth();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {  // here we are accessing window scroll(outside effect)
        function handleScroll() {
            if (window.scrollY > 0) {
                setScrolled(true);
            }
            else if (window.scrollY == 0) {
                setScrolled(false);
            }
        }
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    const navItems = (
        <>
            <li className="hover:scale-105">
                <a href="/"><b>Home</b></a>
            </li>
            <li className="hover:scale-105">
                <a href="/store"><b>Store</b></a>
            </li>
            <li className="relative hover:scale-105">
                <a href="/airecommend" className="relative">
                    <b>AI Guide</b>
                    <span className="absolute md:-top-2 md:-right-2 md:mr-0  -top-1 text-xs ">
                        +
                    </span>
                </a>
            </li>
            <li className="hover:scale-105">
                <a href="/contact"><b>Contact</b></a>
            </li>

            <li className="hover:scale-105">
                <a href="/#features"> <b>About</b></a>
            </li>
        </>
    )
    return (
        <div className={`max-w-screen-2xl container mx-auto md:px-10 px-5 fixed top-0 left-0 right-0 z-50 ${scrolled
            ? "shadow-md bg-base-300 duration-300 transition-all ease-in-out"
            : ""
            }`}
        >
            <div className="navbar">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {navItems}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">LeafAI</a>
                </div>
                <div className="navbar-center">
                    <div className="hidden lg:flex">
                        <ul className="flex gap-6 px-8 py-2 bg-gray-200 backdrop-blur-md rounded-full shadow-sm">
                            {navItems}
                        </ul>
                    </div>
                </div>
                <div className="navbar-end">
                    {/* {useLocation().pathname == "/" for themebutton} */}
                    {/* input search box */}
                    {useLocation().pathname == "/store" &&
                        <div className=" hidden md:block">
                            <label className="input border-2 border-black py-2 px-2 flex items-center gap-2 ">
                                <input type="text" className="grow outline-none" placeholder="Search Books" />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-5 w-5 opacity-70">
                                    <path
                                        fillRule="evenodd"
                                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                        clipRule="evenodd" />
                                </svg>
                            </label>
                        </div>}
                    {/* login button */}
                    {/* {authUser ? <Logout /> :
                        <a className="btn bg-black text-white rounded-500 ml-4 hover:bg-white hover:text-black hover:border-black" onClick={() => document.getElementById('my_modal_3').showModal()}>Login</a>
                    }
                    <LoginModal /> */}

                    {/* Login button and User menu dropdown */}
                    {authUser ?

                        <div className="dropdown dropdown-end ml-4">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle avatar relative"
                            >
                                <div className="group">
                                    <BsPersonCircle className="w-6 h-6" />
                                    {/* Updated tooltip positioning and z-index */}
                                    <span className="absolute -top-12 right-0 z-50 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 rounded bg-gray-800 p-2 text-xs text-white whitespace-nowrap">
                                        {authUser.fullname || 'User'}
                                    </span>
                                </div>
                            </div>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow-lg border menu menu-md dropdown-content bg-base-100 rounded-box w-52">
                                <li className="mt-1 ">
                                    <Link to={`/cart/${authUser._id}`} className="flex items-center gap-2">  {/*calling to frontend only to display cartpage component*/}
                                        <BsCart3 className="w-5 h-5" />
                                        Cart
                                    </Link>
                                </li>
                                <li className=" mt-1 mb-2"><a> <BsGear className="w-5 h-5" />Settings</a></li>
                                <li className="mt-2 mb-2 mr-4"><Logout /></li>
                            </ul>
                        </div>

                        :
                        <a className="btn bg-black text-white rounded-500 ml-4 hover:bg-white hover:text-black hover:border-black" onClick={() => document.getElementById('my_modal_3').showModal()}>Login</a>
                    }
                    <LoginModal />
                </div>
            </div>
        </div>
    )
}