import imageTest from "../../assets/images/women.png";
import "./AdminCard.css"
import {useNavigate} from "react-router";

function AdminCard() {
    const navigate = useNavigate();

    const showProfileDropdown = () => {
        const profile = document.getElementById("logout-btn");
        if (profile.classList.contains("hidden")) {
            profile.classList.toggle("show")
            profile.classList.remove("hidden");
        } else {
            profile.classList.toggle("hide")
            profile.classList.add("hidden");
        }
    }

    const logoutOnClick = () => {
        localStorage.clear();
        navigate("/");
    }
    return (
        <div className="flex items-center">
            <div className="mr-[35px]">
                <button className="logout-btn hidden" id="logout-btn" onClick={logoutOnClick}>
                    Se déconnecter
                </button>
            </div>
            <div className="profile-card" onClick={showProfileDropdown}>
                <img src={imageTest} alt="Profile Picture" className="profile-img"/>
                <div className="profile-info">
                    <h2 className="font-nunito-regular">Enory D’Huysser</h2>
                    <p className="role font-nunito-regular">Owner</p>
                </div>
            </div>
        </div>


    );
}

export default AdminCard;