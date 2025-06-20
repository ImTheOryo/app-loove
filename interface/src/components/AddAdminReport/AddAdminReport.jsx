import "./AddAdminReport.css";
import Modal from "react-modal";
import { FiX } from "react-icons/fi";
import { API_BASE_URL } from "../../constants/Constants";
import { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { toast } from "react-toastify";

function AddAdminReport({ showModal, setShowModal, reportID, setReload}) {
    const [admins, setAdmins] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const AddAdminToReport = async (adminID) => {
        try {
            const res = await fetch(`${API_BASE_URL}/report/${reportID}/${adminID}`, {
                method: "POST",
                headers: { Token: localStorage.getItem("token") },
            });

            if (res.status === 201) {
                toast.success("Personne ajoutée");
                GetAllAdmin();

            } else {
                toast.error("Échec de l'ajout");
            }
        } catch (error) {
            toast.error("Erreur réseau lors de l'ajout");
            console.error("Error adding admin to report:", error);
        }
    };

    const GetAllAdmin = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/admins/${reportID}`, {
                method: "GET",
                headers: { Token: localStorage.getItem("token") },
            });

            if (res.status === 200) {
                const data = await res.json();
                setAdmins(data.body || []);
            } else if (res.status === 204) {
                toast.error("Tout les admins sont sur ce report")
            } else {
                toast.error("Impossible de récupérer les données");
            }
        } catch (error) {
            toast.error("Erreur réseau lors de la récupération des admins");
            console.error("Error fetching admins:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (showModal) {
            GetAllAdmin();
        }
    }, [showModal]);

    return (
        <Modal
            isOpen={showModal}
            contentLabel="Message Modal"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            className="bg-[#F9F9F9] rounded-lg shadow-lg p-6 w-[90%] max-w-md mx-auto"
        >
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Ajouter une personne :</h2>
                <button
                    onClick={() => {
                        setReload()
                        setShowModal(!showModal)
                    }
                }
                    className="text-gray-500 hover:text-gray-700"
                >
                    <FiX size={20} />
                </button>
            </div>
            <div className="mt-4">
                {isLoading ? (
                    <p className="text-gray-600">Chargement...</p>
                ) : (
                    admins.map((item) => (
                        <div
                            key={item.id}
                            className="mt-5 flex w-full justify-around bg-white rounded-2xl p-2 shadow-md"
                        >
                            <img
                                src={`${API_BASE_URL}/upload/${item.image}`}
                                className="w-[48px] h-[48px] rounded-full object-cover"
                                alt="Admin Profile"
                            />
                            <div>
                                <h2 className="font-nunito-regular font-bold">{item.name}</h2>
                                <p className="font-nunito-regular">{item.role}</p>
                            </div>
                            <button
                                className="text-3xl text-green-700"
                                onClick={() => AddAdminToReport(item.id)}
                            >
                                <BsPlus />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </Modal>
    );
}

export default AddAdminReport;
