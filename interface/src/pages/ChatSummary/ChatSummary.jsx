import "./ChatSummary.css";
import Navbar from "../../components/Navbar/Navbar";
import ChatSummaryCard from "../../components/ChatSummaryCard/ChatSummaryCard";
import {useEffect, useState} from "react";
import {API_BASE_URL} from "../../constants/Constants";

function ChatSummary() {
    const [userData, setUserData] = useState([]);
    document.title = "Harmony | Conversations";
    const listItem = [];

    const fetchData = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/match/${localStorage.getItem("id")}`, {
                method: 'GET',
                headers: { "Token": localStorage.getItem("token") },
            })

            if (!response.ok) {
                new Error(`Erreur HTTP : ${response.status}!`);
            }

            if (response.status === 200) {
                const data = await response.json();
                setUserData(data.body);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des matchs :", error);
            throw error;
        }
    }

    useEffect(() => {

        fetchData();
    },  []);

    if (isNaN(userData)){
        listItem.push(userData.map(user => <ChatSummaryCard key={Math.random()} userData={user} />));
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