import "./Chat.css";
import { IoChevronBackOutline } from "react-icons/io5";
import { GrFlag } from "react-icons/gr";
import { Link, useLocation } from "react-router";
import ChatBubbleReceiver from "../../components/ChatBubbleReceiver/ChatBubbleReceiver";
import ChatBubbleSender from "../../components/ChatBubbleSender/ChatBubbleSender";
import { useEffect, useState } from "react";
import { ChatService } from "../../services/ChatService";
import { API_BASE_URL } from "../../constants/Constants";
import { FiSend } from "react-icons/fi";

function Chat() {
    const chatService = new ChatService();
    const location = useLocation();
    const [messages, setMessages] = useState([]);
    const [imageOtherUser, setImageOtherUser] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const userIdChatWith = location.pathname.replace("/conversations/", "");
    const messagesArray = [];

    const HandleSendMessage = async () => {
        const form = document.getElementById("message");
        await chatService.sendMessage(form, userIdChatWith);
    }

    const getMessages = async () => {
        try {
            const res = await chatService.getAllMessages(userIdChatWith);
            const data = await res.json();

            if (isNaN(data.body)) {
                await chatService.seenMessage(userIdChatWith);
                setImageOtherUser(data.body[1]);
                setFirstName(data.body[2]);
                const newMessages = data.body.slice(3).reverse();
                newMessages.map((item) => {
                    if(item["id_sender"] === Number(userIdChatWith)){
                        messagesArray.push(<ChatBubbleReceiver key={Math.random()} name={data.body[2]} image={data.body[1]} data={item} />);
                    } else {
                        messagesArray.push(<ChatBubbleSender key={Math.random()} image={data.body[0]} data={item}/>);
                    }
                })
                setMessages(messagesArray);
            }
        } catch (error) {
            console.error("Erreur lors du chargement des messages :", error);
        }
    };

    setTimeout(() => {
        getMessages()
    }, 500)
    useEffect(() => {

        getMessages();
    }, [userIdChatWith]);

    return (
        <div>
            <div className="chat-header">
                <Link to="/conversations">
                    <IoChevronBackOutline className="text-5xl" />
                </Link>
                <div className="header-image" >
                    {imageOtherUser && <img src={`${API_BASE_URL}/upload/${imageOtherUser}`} alt="User" />}
                    {firstName && <span>{firstName}</span>}
                </div>

                <button className="header-report-btn">
                    <GrFlag className="text-[#808080]" />
                </button>
            </div>
            <section className="chat-section">
                {messages}
            </section>
            <div className="chat-input">
                <form id="message" action="" className="flex-1 outline-none bg-transparent text-gray-600 placeholder-gray-400 px-4">
                    <input
                        type="text"
                        name="message"
                        placeholder="Envoyer un message"
                    />
                </form>
                <button className="p-2 mr-2 self-center text-gray-400 hover:text-gray-600" onClick={HandleSendMessage}>
                    <FiSend/>
                </button>
            </div>
        </div>
    );
}

export default Chat;
