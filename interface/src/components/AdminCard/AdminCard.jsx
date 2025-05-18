import imageTest from "../../assets/images/women.png";
import "./AdminCard.css"
import {useNavigate} from "react-router";
import {useState} from "react";
import {motion} from "motion/react";


function AdminCard() {
    const navigate = useNavigate();
    const [displayLogout, setDisplayLogout] = useState(false);



    const logoutOnClick = () => {
        localStorage.clear();
        navigate("/");
    }
    return (
        <div className="flex items-center">

            <motion.div
                key="AnimationShowLogoutBtn"
                initial={{
                    opacity: 0,
                    x: displayLogout ? 0 : 100,
                }}
                animate={{
                    opacity: displayLogout ? 1 : 0,
                    x: displayLogout ? 0 : 100,
                    transition: {
                        duration: 0.5,
                    },
                }}
                exit={{ opacity: 0 }}
            >
                <div className="mr-[35px]">
                    <button className={!displayLogout ? "" : "flex"} id="logout-btn" onClick={logoutOnClick}>
                        Se déconnecter
                    </button>
                </div>
            </motion.div>


            <div id="profile-card" onClick={() => setDisplayLogout(!displayLogout)}>
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