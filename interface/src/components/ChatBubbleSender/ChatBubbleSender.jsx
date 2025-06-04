import "./ChatBubbleSender.css";
import {API_BASE_URL} from "../../constants/Constants";
import { FaCheckDouble } from "react-icons/fa6";

function ChatBubbleSender({image, data}) {


    return (
        <article className="ChatBubbleSender">
            <img src={`${API_BASE_URL}/upload/${image}`} alt="Test test"/>

            <div className="flex items-end flex-col">
                <div className="flex flex-col-reverse items-end mb-2 mr-2">
                    <span className="font-poppins-regular text-gray-800">
                        You
                    </span>
                </div>
                <p className="message-sender font-nunito-regular">
                    {data["message"]}
                </p>
                <div className="flex items-end mb-2 mr-3">
                    <span className="text-sm text-gray-500">
                        {data["date"].replace(":00", "")}
                    </span>
                    <FaCheckDouble className={`text-xs ml-1 self-center ${Number(data["seen"]) === 0 ? "text-gray-400" : "text-blue-600"}`}/>
                </div>
            </div>
        </article>
    )
}

export default ChatBubbleSender;