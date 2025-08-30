import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";
import toast from "react-hot-toast";

export default function Logout() {
    const [authUser, setAuthUser] = useAuth();
    const navigate = useNavigate();
    function handleLogout() {
        try {
            setAuthUser({
                ...authUser,
                user: null
            });
            localStorage.removeItem("User");
            toast.success("Logout Successful");
            setTimeout(() => {
                window.location.reload();
            }, 1000);
            navigate("/");
        } catch (error) {
            if (error.response) {
                console.log("logout error is ", error.response);
                toast.error("logout failed", error.response.message);
            }
        }
    }
    return (
        <a className="btn bg-black text-white  hover:bg-white hover:text-black rounded-500 ml-4" onClick={handleLogout}>
            Log out
        </a>
    )
}