import "./Settings.css";
import Navbar from "../../components/Navbar/Navbar";
import {useNavigate} from "react-router";


function Settings () {
    const navigate = useNavigate()

    const Logout = () => {
        localStorage.clear();
        navigate("/");
    }
    return (
        <div>
            <button
                className="primary-btn"
                onClick={() => Logout()}
            >
                Se déconnecter
            </button>

            <Navbar/>
        </div>
    )
}

export default Settings