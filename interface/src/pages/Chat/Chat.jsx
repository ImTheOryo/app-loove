import "./Chat.css";
import { IoChevronBackOutline } from "react-icons/io5";
import { GrFlag } from "react-icons/gr";
import { Link, useLocation } from "react-router";
import ChatBubbleReceiver from "../../components/ChatBubbleReceiver/ChatBubbleReceiver";
import ChatBubbleSender from "../../components/ChatBubbleSender/ChatBubbleSender";
import { useEffect, useState } from "react";
import { API_BASE_URL, PUSHER_CLUSTER, PUSHER_KEY } from "../../constants/Constants";
import { FiSend } from "react-icons/fi";
import Pusher from "pusher-js";
import {ChatService} from "../../services/ChatService";
import ReportModal from "../../components/ReportModal/ReportModal";
import UserProfileExtended from "../../components/UserProfileExtended/UserProfileExtended";

function Chat() {
    const [messages, setMessages] = useState([]);
    const [chatRoomId, setChatRoomId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [image, setImage] = useState("");
    const [messageTyped, setMessageTyped] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const location = useLocation();
    const currentUserChatId = location.pathname.replace("/conversations/", "");
    const chatService = new ChatService();
    const initializeChatRoom = async () => {
        const userID = localStorage.getItem("id");

        try {
            const res = await fetch(`${API_BASE_URL}/chatroom/${userID}/${currentUserChatId}`, {
                method: 'GET',
                headers: { "Token": localStorage.getItem("token") },
            });

            if (!res.ok) {
                console.error("Error fetching chatRoomId:", res.status);
                return;
            }

            const room = await res.json();
            const roomId = room.body["chat_room_id"];
            setChatRoomId(roomId);
            getMessages(roomId);
        } catch (error) {
            console.error("Error initializing chat room:", error);
        }
    };

    const getMessages = async (roomId) => {
        const userID = localStorage.getItem("id");
        const messagesArray = [];

        try {
            const response = await fetch(`${API_BASE_URL}/chat/${roomId}`, {
                method: 'GET',
                headers: { "Token": localStorage.getItem("token") },
            });

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            const data = await response.json();
            const newMessages = data.body.messages;

            setImage(data.body.avatar[`avatar_user_${currentUserChatId}`]);
            setFirstName(data.body.name[`first_name_${currentUserChatId}`]);


            if (isNaN(data.body.messages)) {
                newMessages.reverse().forEach((item) => {
                    if (item["id_sender"] === Number(userID)) {
                        messagesArray.push(
                            <ChatBubbleSender
                                key={Math.random()}
                                image={data.body.avatar[`avatar_user_${userID}`]}
                                data={item}
                            />
                        );
                    } else {
                        messagesArray.push(
                            <ChatBubbleReceiver
                                key={Math.random()}
                                name={data.body.name[`first_name_${currentUserChatId}`]}
                                image={data.body.avatar[`avatar_user_${item['id_sender']}`]}
                                data={item}
                            />
                        );
                    }
                });

                setMessages(messagesArray);
                await chatService.seenMessage(roomId, currentUserChatId);
            }



        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };


    const sendMessage = async () => {
        await chatService.sendMessage(chatRoomId, messageTyped)
        setMessageTyped("");
    }

    useEffect(() => {
        initializeChatRoom();

    }, [currentUserChatId]);

    useEffect(() => {
        if (!chatRoomId) return;

        const pusher = new Pusher(PUSHER_KEY, {
            cluster: PUSHER_CLUSTER,
        });

        const channel = pusher.subscribe(chatRoomId);

        channel.bind("message", () => {
            getMessages(chatRoomId);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [chatRoomId]);

    document.title = `Harmony | Chatting avec ${firstName}`;

    return (
        <div>
            <div className={showProfile ? "" : "hidden"}>
                <UserProfileExtended setShowExtendProfile={setShowProfile} userID={currentUserChatId} />
            </div>
            <div  className={showProfile ? "hidden" : ""}>
                <div className="chat-header">
                    <Link to="/conversations">
                        <IoChevronBackOutline className="text-5xl" />
                    </Link>
                    <div className="header-image" onClick={() => setShowProfile(!showProfile)}>
                        <img src={`${API_BASE_URL}/upload/${image}`} alt="User" />
                        <span>{firstName}</span>
                    </div>
                    <button className="header-report-btn"  onClick={() => setShowModal(!showModal)}>
                        <GrFlag className="text-red-600"/>
                    </button>
                </div>
                <section className="chat-section">
                    {messages}
                </section>
                <div className="chat-input">
                    <input
                        id="textInput"
                        className="flex-1 outline-none bg-transparent text-gray-600 placeholder-gray-400 px-4"
                        type="text"
                        name="message"
                        placeholder="Envoyer un message"
                        value={messageTyped}
                        onChange={(event) => setMessageTyped(event.target.value)}
                        onKeyDown={async (e) => {
                            if (e.key === "Enter")
                                await sendMessage();
                        }}

                    />
                    <button className="p-2 mr-2 self-center text-gray-400 hover:text-gray-600" onClick={sendMessage}>
                        <FiSend />
                    </button>
                </div>
                <ReportModal setShowModal={setShowModal} showModal={showModal} userID={currentUserChatId}/>
            </div>
        </div>
    );
}

export default Chat;
