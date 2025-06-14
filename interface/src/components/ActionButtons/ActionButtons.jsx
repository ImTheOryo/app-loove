import "./ActionButtons.css";
import { FaHeart } from "react-icons/fa";
import { TbMessageCircleShare } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import {DiscoveryService} from "../../services/DiscoveryService";

function ActionButtons({showExtendProfile, setShowExtendProfile, currentUser, userCount, setUserCount}) {
    const discovery = new DiscoveryService();

    async function skipUser(){
        // const res = await discovery.ActionUser("skip",  currentUser);
        setShowExtendProfile(false);
        const count = userCount + 1;
        setUserCount(count);
    }

    async function likeUser(){
        await discovery.ActionUser("like",  currentUser);
        setShowExtendProfile(false);
        const count = userCount + 1;
        setUserCount(count);
    }

    async function messageUser(){

    }



    return (
        <div id="action-buttons" style={{bottom: showExtendProfile ? "0px" : "90px", opacity: showExtendProfile ? 0.85 : 1}} >
            <button id="skip-btn" onClick={skipUser}>
                <IoClose/>
            </button>

            <button id="message-btn">
                <TbMessageCircleShare/>
            </button>

            <button id="like-btn"  onClick={likeUser}>
                <FaHeart/>
            </button>
        </div>
    )
}

export default ActionButtons;