import pp from "../../assets/images/women.png";
import "./AdminCard.css"
import {useNavigate} from "react-router";
import {use, useEffect, useState} from "react";
import {motion} from "motion/react";
import {API_BASE_URL} from "../../constants/Constants";


function AdminCard() {
    const navigate = useNavigate();
    const [displayLogout, setDisplayLogout] = useState(false);
    const [admin, setAdmin] = useState([]);
    const getAdminData = async () => {
        const res = await fetch(`${API_BASE_URL}/admin/${localStorage.getItem('id')}`,{
            method: "GET",
            headers: {Token: localStorage.getItem('token')},
        })

        if (res.status === 200) {
            const data = await res.json();
            setAdmin(data.body[0]);
        }
    }

    useEffect(() => {
        getAdminData()
    }, []);

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

            {
                isNaN(admin) && (
                    <div id="profile-card" onClick={() => setDisplayLogout(!displayLogout)}>
                        <img src={`${API_BASE_URL}/upload/${admin.image}`} alt="Admin PP" className="profile-img"/>
                        <div className="profile-info">
                            <h2 className="font-nunito-regular">
                                {admin.name}
                            </h2>
                            <p className="role font-nunito-regular">
                                {admin.role}
                            </p>
                        </div>
                    </div>
                )
            }

        </div>


    );
}

export default AdminCard;