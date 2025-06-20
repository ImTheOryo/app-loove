import "./Settings.css";
import Navbar from "../../components/Navbar/Navbar";
import {useNavigate} from "react-router";
import * as PusherPushNotifications from "@pusher/push-notifications-web";


function Settings () {
    const navigate = useNavigate()
    const beamsClient = new PusherPushNotifications.Client({
        instanceId: "d3357f00-ef05-4ba6-afea-f741e8d1814e",
    });

    const Logout = async () => {
        await beamsClient.clearAllState();
        localStorage.clear();
        navigate("/");
    }
    return (
        <div className="w-[90%] m-auto mt-16">
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