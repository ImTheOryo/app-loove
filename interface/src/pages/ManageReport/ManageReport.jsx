import "./ManageReport.css";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import { FaPlus } from "react-icons/fa";
import {API_BASE_URL} from "../../constants/Constants";
import AdminReportedProfile from "../../components/AdminReportedProfile/AdminReportedProfile";
import AddAdminReport from "../../components/AddAdminReport/AddAdminReport";
import {HiXMark} from "react-icons/hi2";
import AdminChat from "../../components/AdminChat/AdminChat";
import {toast} from "react-toastify";
import {MdOutlineReportProblem} from "react-icons/md";
import AdminActionReportModal from "../../components/AdminActionReportModal/AdminActionReportModal";

function ManageReport (){
    const [reportData, setReportData] = useState([]);
    const [adminInCharge, setAdminInCharge] = useState([]);
    const [showModalAddAdmin, setShowModalAddAdmin] = useState(false);
    const [showModalActionReport, setShowModalActionReport] = useState(false);
    const [image, setImage] = useState("");
    const [reload, setReload] = useState(false);
    const { report_id } = useParams();

    const reportStatus = [
        { status: "Non traité", color: "bg-red-500 text-white"},
        { status: "En cours de traitement", color: "bg-orange-500 text-white"},
        { status: "Fermé", color: "bg-green-100"},
    ];


    const reasonColors = [
        { title: "Harcèlement"},
        { title: "Menace"},
        { title: "Argent"},
        { title: "Identité"},
        { title: "Photos"},
        { title: "Pub"},
        { title: "Autre"},
    ];

    const DeleteAdminToReport = async (adminID) => {
        try {
            const res = await fetch(`${API_BASE_URL}/report/${report_id}/${adminID}`, {
                method: "DELETE",
                headers: { Token: localStorage.getItem("token") },
            });
            if (res.status === 200) {
                GetReport();


            }
        } catch (error) {
            toast.error("Erreur réseau lors de l'ajout");
            console.error("Error adding admin to report:", error);
        }
    };

    const GetReport = async  () => {
        const res = await fetch(`${API_BASE_URL}/report/${report_id}`,{
            method: "GET",
            headers: {Token: localStorage.getItem('token')}
        });

        if (res.status === 200) {
            const data = await res.json();
            setReportData(data.body[0]);
            setAdminInCharge(data.body[1]);
            setReload(true)
        }
    }

    useEffect(() => {
        GetReport()
    }, [reload]);

    return (
        <div className="bg-[#FAFAFA]">
            {isNaN(reportData) && (
                <div className="p-6 bg-white rounded-xl space-y-8 w-full h-full bg-[#FAFAFA]">
                    <AddAdminReport showModal={showModalAddAdmin} setShowModal={setShowModalAddAdmin} reportID={report_id} setReload={GetReport}/>
                    <AdminActionReportModal showModal={showModalActionReport} setShowModal={setShowModalActionReport} userReported={reportData.reported} reportID={report_id} setReload={GetReport}/>
                    <header>
                        <div className="flex items-center justify-between ">
                            <h2 className="text-2xl font-semibold text-gray-800">
                                Ticket #{reportData.id} | {reasonColors[reportData.reason - 1].title}
                            </h2>
                            <span className={`p-3 rounded-full ${reportStatus[reportData.status - 1].color}`}>
                                {reportStatus[reportData.status - 1].status}
                            </span>
                        </div>
                        <div className="flex justify-between mt-4">
                            <div className="p-2 rounded-[15px] bg-gray-100 w-max">
                                <h3 className="text-lg text-gray-700">
                                    Informations suplémentaires :
                                </h3>
                                <p className="text-[14px] text-gray-500 mt-2">
                                    {reportData.message}
                                </p>
                            </div>
                            <button
                                className=" flex items-center h-max p-3 rounded-md text-white bg-blue-600 font-bold font-nunito-bold"
                                onClick={() => {
                                    setShowModalActionReport(!showModalActionReport);
                                }}
                            >
                                Menu d'action
                                <MdOutlineReportProblem className="ml-2"/>
                            </button>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">

                        <div className="md:col-span-2 space-y-4">
                            <div className="grid grid-cols-2 gap-2 m-auto">
                                <div>
                                    <h4 className='text-lg font-semibold text-gray-700 text-center'>
                                        Profil du signalé
                                    </h4>
                                    <div className="overflow-y-auto h-[485px] shadow-md p-1 rounded-2xl">
                                        <AdminReportedProfile userID={reportData.reported} setImage={setImage}/>
                                    </div>
                                </div>


                                <div>
                                    <h4 className='text-lg font-semibold text-gray-700 text-center'>
                                        Conversation
                                    </h4>
                                    <div className='overflow-y-auto h-[485px] shadow-md p-1 rounded-2xl'>
                                        {isNaN(image) && (
                                            <AdminChat report_id={report_id} image={image} reportedID={reportData.reported}/>
                                        )}
                                    </div>
                                </div>

                            </div>
                        </div>


                        <div className="bg-gray-50 p-4 rounded-lg shadow-inner ">

                            <div className='flex justify-between items-center mb-4'>
                                <h4 className="text-md font-semibold text-gray-700">
                                    Personne(s) en charge
                                </h4>
                                <button
                                    className="flex items-center gap-1 text-sm text-color-my-red hover:underline"
                                    onClick={() => {
                                        setShowModalAddAdmin(!showModalAddAdmin)
                                    }}
                                >
                                    <FaPlus className="text-xs" /> Ajouter
                                </button>
                            </div>
                            <div className="h-full flex flex-col items-center">
                                {Array.isArray(adminInCharge) && adminInCharge.length > 0 && (
                                    adminInCharge.map((item) => (
                                        <div key={item.id} className="mt-5 flex w-full justify-between bg-[#FFFFFF] rounded-2xl p-2 shadow-md">
                                            <img src={`${API_BASE_URL}/upload/${item.image}`} className="w-[48px] h-[48px] rounded-full object-cover" alt="Admin Profile" />
                                            <div className="">
                                                <h2 className="font-nunito-regular font-bold">
                                                    {item.name}
                                                </h2>
                                                <p className=" font-nunito-regular">
                                                    {item.role}
                                                </p>
                                            </div>
                                            <button
                                                className="text-3xl text-color-my-red"
                                                onClick={() => DeleteAdminToReport(item.id)}
                                            >
                                                <HiXMark/>
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ManageReport;