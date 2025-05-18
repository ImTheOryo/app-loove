import "./ActionButtons.css";
import { FaHeart } from "react-icons/fa";
import { TbMessageCircleShare } from "react-icons/tb";
import { IoClose } from "react-icons/io5";

function ActionButtons({showExtendProfile}) {
    return (
        <div id="action-buttons" style={{bottom: showExtendProfile ? "190px" : "105px", opacity: showExtendProfile ? 0.85 : 1}} >
            <button id="skip-btn">
                <IoClose/>
            </button>

            <button id="message-btn">
                <TbMessageCircleShare/>
            </button>

            <button id="like-btn">
                <FaHeart/>
            </button>
        </div>
    )
}

export default ActionButtons;