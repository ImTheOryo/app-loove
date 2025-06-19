import "./MessageModal.css";
import {useState} from "react";
import Modal from "react-modal";
import {FiX} from "react-icons/fi";
import {API_BASE_URL} from "../../constants/Constants";


function MessageModal ({isOpen, setIsOpen, currentUser, userCount, setUserCount}) {
    const [message, setMessage] = useState("");

    console.log(currentUser)

    const handleSubmit = async () => {
        if (message.trim().length > 0) {
            await fetch(`${API_BASE_URL}/message/${localStorage.getItem('id')}/${currentUser}`,{
                method: "POST",
                headers: {Token: localStorage.getItem('token')},
                body: JSON.stringify({
                    message: message,
                })
            });
            setUserCount(userCount + 1)
            setMessage("");
            setIsOpen(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            contentLabel="Message Modal"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md mx-auto"
        >
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Envoyer un message</h2>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-gray-500 hover:text-gray-700"
                >
                    <FiX size={20} />
                </button>
            </div>
            <p className="mt-4 text-gray-600">
                Veuillez écrire votre message ci-dessous :
            </p>
            <div className="mt-6 space-y-3">
        <textarea
            className="bg-gray-100 w-full h-28 rounded-lg p-3 text-gray-800"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            placeholder="Écrivez votre message ici..."
        />
                <button
                    className="text-center bg-red-600 text-white w-full rounded-lg py-2 font-bold hover:bg-red-700"
                    onClick={() => {
                        handleSubmit();
                    }}
                >
                    Envoyer
                </button>
            </div>
        </Modal>
    )
}

export default MessageModal;