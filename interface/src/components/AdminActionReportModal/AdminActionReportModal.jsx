import Modal from "react-modal";
import { FiX, FiUserX, FiUserMinus, FiCheckCircle } from "react-icons/fi";
import {API_BASE_URL} from "../../constants/Constants";

function AdminActionReportModal({ showModal, setShowModal, userReported, reportID, setReload }) {

    const CloseReport = async () => {
        try {
            await fetch(`${API_BASE_URL}/report/${reportID}`,{
                method: "PATCH",
                headers: {Token: localStorage.getItem("token")},
            });
            setReload();
            setShowModal(false);
        } catch (e) {
            console.error("Une erreur est survenue lors de la fermeture du report :", e);
            setShowModal(false);
        }
    }

    const handleAction = async (action) => {
        try {
            await fetch(`${API_BASE_URL}/report/${action}/${userReported}`, {
                method: "PATCH",
                headers: {Token: localStorage.getItem("token")},
            })
            CloseReport()
            setReload();
            setShowModal(false);
        } catch (e) {
            console.error(`Une erreur est survenue lors de ${action} :`, e);
            setShowModal(false);
        }

    };

    return (
        <Modal
            isOpen={showModal}
            contentLabel="Admin Action Modal"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            className="bg-[#F9F9F9] rounded-lg shadow-lg p-6 w-[90%] max-w-md mx-auto"
        >
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                    Actions disponibles
                </h2>
                <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                >
                    <FiX size={24} />
                </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
                <button
                    onClick={() => {CloseReport()}}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                    <FiCheckCircle size={20} />
                    Fermer le report
                </button>
                <button
                    onClick={() => handleAction("disable")}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                >
                    <FiUserMinus size={20} />
                    Désactiver le compte
                </button>
                <button
                    onClick={() => handleAction("ban")}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                    <FiUserX size={20} />
                    Bannir la personne
                </button>
            </div>
        </Modal>
    );
}

export default AdminActionReportModal;
