import "./ChatSummaryCard.css";
import pp from "../../assets/images/women.png";

function ChatSummaryCard({image, name, time, message}) {
    return (
        <article className="ChatSummaryCard">
            <div className="ChatSummaryCard-profile">
                <img src={pp} alt="Test test"/>
            </div>
            <div className="ChatSummaryCard-content">
                <div className="ChatSummaryCard-header">
                    <span className="ChatSummaryCard-name font-poppins-bold">Émilie</span>
                    <span className="ChatSummaryCard-time font-nunito-regular">10 min</span>
                </div>
                <div className="ChatSummaryCard-body">
                    <span className="ChatSummaryCard-message">message</span>
                    <div className="ChatSummaryCard-notification">
                        <span>1</span>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default ChatSummaryCard;