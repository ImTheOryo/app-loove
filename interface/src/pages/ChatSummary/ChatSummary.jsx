import "./ChatSummary.css";
import Navbar from "../../components/Navbar/Navbar";
import ChatSummaryCard from "../../components/ChatSummaryCard/ChatSummaryCard";

function ChatSummary() {
    document.title = "Harmony | Conversations";

    const listItems = [];
    for (let i = 1; i <= 10; i++) {
        listItems.push(<ChatSummaryCard/>);
    }

    return (
        <div className="flex">
            <div id="chat-summary-div">
                <h3>
                    Conversations
                </h3>
                <h2 className="mb-7">
                    Messages
                </h2>
                <section id="chat-summary-messages">
                    {listItems}
                </section>
            </div>

            <Navbar/>
        </div>
    );
}

export default ChatSummary;