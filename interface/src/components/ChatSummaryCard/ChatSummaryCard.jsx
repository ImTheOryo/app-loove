import "./ChatSummaryCard.css";
import {API_BASE_URL} from "../../constants/Constants";
import {useNavigate} from "react-router";

function ChatSummaryCard({userData}) {
    const navigate = useNavigate();

    const handleSummaryChatClick = () => {
        navigate(`/conversations/${userData["user_id"]}`);
    }

    return (
        <article className="ChatSummaryCard" onClick={handleSummaryChatClick}>
            <div className="ChatSummaryCard-profile">
                <img src={`${API_BASE_URL}/upload/${userData["image_name"]}`} alt={userData["first_name"]} loading="lazy" />
            </div>
            <div className="ChatSummaryCard-content">
                <div className="ChatSummaryCard-header">
                    <p className="ChatSummaryCard-name font-poppins-bold">{userData["first_name"]}</p>

                    <div className={`ChatSummaryCard-notification`} style={{ display: parseInt(userData["count_message"]) > 0 ? "flex" : "none" }} ><span>{userData["count_message"]}</span></div>
                </div>
            </div>
        </article>
    )
}

export default ChatSummaryCard;