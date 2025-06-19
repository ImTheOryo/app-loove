import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from "../../constants/Constants";
import {useNavigate} from "react-router";

const ReportList = () => {
    const [reports, setReports] = useState([]);
    const navigate = useNavigate();

    const columnColors = {
        "Non traité": "bg-red-100",
        "En cours de traitement": "bg-yellow-100",
        "Fermé": "bg-green-100",
    };

    const reasonColors = [
        { title: "Harcèlement", color: "bg-red-500" },
        { title: "Menace", color: "bg-red-700" },
        { title: "Argent", color: "bg-yellow-500" },
        { title: "Identité", color: "bg-blue-500" },
        { title: "Photos", color: "bg-purple-500" },
        { title: "Pub", color: "bg-green-500" },
        { title: "Autre", color: "bg-gray-400" },
    ];

    const GetAllReports = async () => {
        const res = await fetch(`${API_BASE_URL}/reports`, {
            method: "GET",
            headers: { Token: localStorage.getItem('token') }
        });

        if (res.status === 200) {
            const data = await res.json();
            setReports(data.body);

            console.log(data.body);
        }
    };

    useEffect(() => {
        GetAllReports();
    }, []);

    return (
        <div className="p-4 pt-9 space-y-6">
            {isNaN(reports) && (
                <div className="grid grid-cols-3 gap-4">
                    {Object.keys(reports).map((status) => (
                        <div key={status} className="space-y-4">
                            <h2 className={`text-lg font-semibold p-2 rounded ${columnColors[status]}`}>{status}</h2>
                            <div className="space-y-2 overflow-y-auto h-[620px]">
                                {reports[status].map((ticket) => (
                                    <div
                                        key={ticket.id}
                                        className="shadow-md p-4 border rounded-lg flex items-center gap-3 hover:scale-95"
                                        onClick={() => {
                                            navigate(`/administrateur/moderation/${ticket.id}`)
                                        }}
                                    >
                                        <div className={`rounded-full w-4 h-4 ${reasonColors[ticket.reason - 1]?.color || 'bg-gray-400'}`}></div>
                                        <div>
                                            <h3 className="font-medium">{reasonColors[ticket.reason - 1]?.title || 'Autre'}</h3>
                                            <p className="my-2 flex items-center">
                                                Personne signalée :{' '}
                                                <span className="bg-blue-300 text-white px-2 py-0.5 rounded-full font-bold ml-1">
                                                    #{ticket.reported}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="text-right ml-auto">
                                            <span className="text-xs font-semibold text-gray-700">#{ticket.id}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReportList;
