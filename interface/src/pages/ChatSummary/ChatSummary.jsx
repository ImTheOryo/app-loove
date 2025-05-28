import "./ChatSummary.css";
import Navbar from "../../components/Navbar/Navbar";
import ChatSummaryCard from "../../components/ChatSummaryCard/ChatSummaryCard";
import {useEffect, useState} from "react";
import {ChatService} from "../../services/ChatService";

function ChatSummary() {
    const [userData, setUserData] = useState([]);
    const chatService = new ChatService();
    document.title = "Harmony | Conversations";
    const listItem = [];

    useEffect(() => {
        const fetchData = async () => {
            try{
                let data = await chatService.getAllMatch();
                data = await data.json();
                setUserData(data.body);
            } catch(e){
                console.error("Error fetching users:", e);
            }
        }
        fetchData();
    },  []);

    if (isNaN(userData)){
        userData.map((user) => {
            listItem.push(<ChatSummaryCard userData={user}/>);
        });
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
                    {listItem}
                </section>
            </div>

            <Navbar/>
        </div>
    );
}

export default ChatSummary;