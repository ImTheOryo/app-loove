import "./ActionButtons.css";
import { FaHeart } from "react-icons/fa";
import { TbMessageCircleShare } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import {DiscoveryService} from "../../services/DiscoveryService";
import {AuthService} from "../../services/AuthService";
import MessageModal from "../MessageModal/MessageModal";
import {useState} from "react";

function ActionButtons({showExtendProfile, setShowExtendProfile, currentUser, userCount, setUserCount}) {
    const [showModalMessage, setShowModalMessage] = useState(false);
    const discovery = new DiscoveryService();
    const auth = new AuthService();
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

    return (
        <div id="action-buttons" className={auth.isSubscribe() ? "justify-between" : "justify-around"} style={{bottom: showExtendProfile ? "0px" : "90px", opacity: showExtendProfile ? 0.85 : 1}} >
            <MessageModal setIsOpen={setShowModalMessage} isOpen={showModalMessage} currentUser={currentUser} setUserCount={setUserCount} userCount={userCount} />
            <button id="skip-btn" onClick={skipUser}>
                <IoClose/>
            </button>

            { auth.isSubscribe() && (
                <button
                    id="message-btn"
                    onClick={() => {
                        setShowModalMessage(!showModalMessage);
                    }}
                >
                    <TbMessageCircleShare/>
                </button>
            )}

            <button id="like-btn"  onClick={likeUser}>
                <FaHeart/>
            </button>
        </div>
    )
}

export default ActionButtons;