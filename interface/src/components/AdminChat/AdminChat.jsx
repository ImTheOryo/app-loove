import "./AdminChat.css";
import {API_BASE_URL} from "../../constants/Constants";
import {useEffect, useState} from "react";
import ChatBubbleReceiver from "../ChatBubbleReceiver/ChatBubbleReceiver";
import ChatBubbleSender from "../ChatBubbleSender/ChatBubbleSender";

function AdminChat ({ report_id, image, reportedID }) {
    const [messages, setMessages] = useState([]);

    const GetReportedChat = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/report/chat/${report_id}`,{
                method: "GET",
                headers: {Token: localStorage.getItem('token')},
            });

            if (res.status === 200) {
                const data = await res.json();
                const newMessages = data.body.messages || [];

                const messagesArray = newMessages.reverse().map((item) => {
                   if (item.id_sender === reportedID){
                       return <ChatBubbleReceiver
                           key={item.id}
                           image={image}
                           data={item}
                       />
                   } else {
                       return <ChatBubbleSender
                           key={item.id}
                           image={image}
                           data={item}
                       />
                   }
                });

                setMessages(messagesArray);
            } else if (res.status === 204) {
                setMessages("Pas de messages")
            }
        } catch (e){
            console.error("Une erreur lors de les récupérations des messages")
        }
    }

    useEffect(() => {
        GetReportedChat()
    }, []);

    return(
        <div className="flex flex-col-reverse pt-4 pl-4">
            {isNaN(messages) &&(
                messages
            )}
        </div>
    )
}

export default AdminChat;