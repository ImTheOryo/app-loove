import "./ManageReport.css";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import { FaPlus } from "react-icons/fa";
import {API_BASE_URL} from "../../constants/Constants";
import UserProfileExtended from "../../components/UserProfileExtended/UserProfileExtended";
import AdminReportedProfile from "../../components/AdminReportedProfile/AdminReportedProfile";

function ManageReport (){
    const [reportData, setReportData] = useState([]);
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

    const GetReport = async  () => {
        const res = await fetch(`${API_BASE_URL}/report/${report_id}`,{
            method: "GET",
            headers: {Token: localStorage.getItem('token')}
        });

        if (res.status === 200) {
            const data = await res.json();
            setReportData(data.body[0]);
        }
    }

    useEffect(() => {
        GetReport()
    }, []);

    return (
        <div>
            {isNaN(reportData) && (
                <div className="p-6 bg-white rounded-xl space-y-8 w-full h-full">
                    <header>
                        <div className="flex items-center justify-between ">
                            <h2 className="text-2xl font-semibold text-gray-800">
                                Ticket #{reportData.id} | {reasonColors[reportData.reason - 1].title}
                            </h2>
                            <span className={`p-3 rounded-full ${reportStatus[reportData.status - 1].color}`}>
                                {reportStatus[reportData.status - 1].status}
                            </span>
                        </div>
                        <div className="p-2 rounded-[15px] bg-gray-100 w-max">
                            <h3 className="text-lg text-gray-700">
                                Informations suplémentaires :
                            </h3>
                            <p className="text-[14px] text-gray-500 mt-2">
                                {reportData.message}
                            </p>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">

                        <div className="md:col-span-2 space-y-4">
                            <h4 className="text-lg font-semibold text-gray-700">
                                Informations de la personne signalée
                            </h4>
                            <div className="grid grid-cols-2 gap-2 m-auto">
                                <div className="overflow-y-auto h-[485px] shadow-2xl p-1 rounded-2xl">
                                    <AdminReportedProfile userID={reportData.reported}/>
                                </div>

                                <div className='overflow-y-auto h-[485px] shadow-2xl p-1 rounded-2xl'>

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
                                >
                                    <FaPlus className="text-xs" /> Ajouter
                                </button>
                            </div>
                            <div className="h-full">

                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}

export default ManageReport;