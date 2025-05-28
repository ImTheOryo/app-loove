import "./ChatBubbleReceiver.css";
import {API_BASE_URL} from "../../constants/Constants";
import {FaCheckDouble} from "react-icons/fa6";

function ChatBubbleReceiver({image, name, data}) {
    return (
        <article className="ChatBubbleReceiver">
            <img src={`${API_BASE_URL}/upload/${image}`} alt="Test test"/>

            <div>
                <div className="flex items-center mb-2">
                    <span className="font-semibold text-gray-800">
                        {name}
                    </span>
                </div>
                <p className=" bg-[#00000012] font-nunito-regular w-max p-2 rounded-b-2xl rounded-tr-2xl">
                    {data["message"]}
                </p>
                <div className="flex items-center mb-2">
                    <FaCheckDouble className={`text-xs self-center ${data["seen"] = 0 ? "text-gray-100" : "text-blue-600"}`}/>
                    <span className="ml-1 text-sm text-gray-500 ">
                        {data["date"]}
                    </span>
                </div>
            </div>
        </article>
    )
}

export default ChatBubbleReceiver;