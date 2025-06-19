import "./ReportModal.css";
import Modal from "react-modal";
import {FiX} from "react-icons/fi";
import {useEffect, useState} from "react";
import {API_BASE_URL} from "../../constants/Constants";
import {isNumericalString} from "motion";
import {toast} from "react-toastify";
import reportList from "../../pages/ReportList/ReportList";

function ReportModal({showModal, setShowModal, userID}) {
    const [reason, setReason] = useState([]);
    const [message, setMessage] = useState("");
    const [reportReason, setReportReason] = useState();
    const GetReportReasons = async () =>{
        const res = await fetch(`${API_BASE_URL}/reason`,{
            method: "GET",
            headers: {Token: localStorage.getItem("token")},
        });
        if (res.status === 200){
            const data = await res.json();
            setReason(data.body);
        }
    }

    const SendReport = async () => {
        if (isNumericalString(reportReason) && message.trim().length !== 0){
            const res = await fetch(`${API_BASE_URL}/report/${localStorage.getItem('id')}/${userID}`,{
                method: "POST",
                headers: {Token: localStorage.getItem('token')},
                body: JSON.stringify({
                    reason_id: reportReason,
                    message: message,
                })
            });

            if (res.status === 201){
                toast.success("Utilisateur signalé avec success");
            } else if (res.status === 400){
                toast.error("Vous avez deja signaler cette personne");
            }

            setShowModal(!showModal);
        } else {

            toast.error("Veuillez nous donner des informations supplémentaire");
        }
    }

    useEffect(() => {
        GetReportReasons();
    }, []);
    return (
        <Modal
            isOpen={showModal}
            contentLabel="Report Modal"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md mx-auto"
        >
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Signaler un problème</h2>
                <button onClick={()=>{setShowModal(!showModal)}} className="text-gray-500 hover:text-gray-700">
                    <FiX size={20} />
                </button>
            </div>
            <p className="mt-4 text-gray-600">
                Pourquoi souhaitez-vous signaler cet utilisateur ?
            </p>
            <div className="mt-6 space-y-3">
                <select
                    name="report-reason"
                    id="report-reason"
                    className="w-full bg-red-100 text-red-700 px-4 py-2 rounded-lg"
                    onChange={(e) => setReportReason(e.target.value)}
                >
                    <option value="">Veuillez choisir une option</option>
                    {Array.isArray(reason) &&
                        reason.map((reportReason, index) => (
                            <option key={index} value={index + 1}>
                                {reportReason}
                            </option>
                        ))
                    }
                </select>

            </div>
            <div className="mt-6 space-y-3">
                <p>
                    Message :
                </p>
                <textarea
                    className="bg-gray-100 w-[100%] h-28 rounded text-left"
                    onChange={(e)=>{
                        setMessage(e.target.value);
                    }}
                    value={message}
                />
                <button
                    className="text-center bg-red-100 text-red-700 w-[100%] rounded-2xl py-1 font-nunito-bold font-bold"
                    onClick={()=>{
                        SendReport()
                    }}
                >
                    Signaler
                </button>
            </div>

        </Modal>
    )
}

export default ReportModal;