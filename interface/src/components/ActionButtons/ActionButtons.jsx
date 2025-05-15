import "./ActionButtons.css";
import { FaHeart } from "react-icons/fa";
import { TbMessageCircleShare } from "react-icons/tb";
import { IoClose } from "react-icons/io5";

function ActionButtons() {
    return (
        <div id="action-buttons">
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