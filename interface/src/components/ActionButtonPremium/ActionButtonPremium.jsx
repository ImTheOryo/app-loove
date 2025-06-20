import {IoClose} from "react-icons/io5";
import {FaHeart} from "react-icons/fa";
import {DiscoveryService} from "../../services/DiscoveryService";

function ActionButtonPremium ({currentUser}) {
    const discovery = new DiscoveryService();
    async function skipUser(){
        await discovery.ActionUser("skip",  currentUser);
    }

    async function likeUser(){
        await discovery.ActionUser("like",  currentUser);
    }
    return (
        <div
            id="action-buttons"
            style={{ bottom: 0, opacity: 0.85 }} >
            <button
                id="skip-btn"
                onClick={() => skipUser()}
            >
                <IoClose/>
            </button>

            <button
                id="like-btn"
                onClick={() => likeUser()}
            >
                <FaHeart/>
            </button>
        </div>
    )
}

export default ActionButtonPremium;