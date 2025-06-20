import React, {useEffect, useState} from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { FaExclamationTriangle, FaUserAlt, FaChartBar } from "react-icons/fa";
import { FaClipboardCheck } from "react-icons/fa6";
import { GiQueenCrown } from "react-icons/gi";
import { BsHourglassSplit } from "react-icons/bs";
import { API_BASE_URL } from "../../constants/Constants";



const Dashboard = () => {
    const [data, setData] = useState({users: 1, premiumUsers: 1, totalReports: 3, unresolvedReports: 1, inProgressReports: 1, closedReports: 1, totalRevenue: "1 €",}) ;


    const reportData = [
        { name: "Non traités", value: data.unresolvedReports },
        { name: "En cours de traitement", value: data.inProgressReports },
        { name: "Fermé", value: data.closedReports },
    ];


    const userData = [
        { name: "Utlisateur Free", value: data.users - data.premiumUsers },
        { name: "Utlisateur Premium", value: data.premiumUsers },
    ];


    const GetAllInfosForDashboard = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/dashboard`,{
                method: "GET",
                headers: {Token: localStorage.getItem('token')}
            });

            if (res.status === 200) {
                const json = await res.json();
                setData(json.body[0])
            }
        } catch (e) {
            console.error("Erreur lors de la récupération des infos : ", e);

        }
    }

    useEffect(() => {
        GetAllInfosForDashboard()
    }, []);


    return (
        <div className="min-h-screen p-6 bg-[#FAFAFA]">
            <div>
                <section className="grid grid-cols-3 gap-6">
                    <article className="bg-white shadow-md rounded-2xl p-6 flex items-center space-x-4">
                        <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                <FaUserAlt className="text-blue-600 w-8 h-8" />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-700">Utilisateur</h2>
                            <p className="text-3xl font-semibold text-blue-600">{data.users}</p>
                            <p className="text-sm text-gray-500 mt-2">
                                Nombre d'utilisateur ayant créer un compte.
                            </p>
                        </div>
                    </article>

                    <article className="bg-white shadow-md rounded-2xl p-6 flex items-center space-x-4">
                        <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                                <GiQueenCrown className="text-yellow-600 w-8 h-8" />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-700">Utilisateur Premium</h2>
                            <p className="text-3xl font-semibold text-yellow-600">{data.premiumUsers}</p>
                            <p className="text-sm text-gray-500 mt-2">
                                Nombre d'utilisateur avec un abonnement premium.
                            </p>
                        </div>
                    </article>

                    <article className="bg-white shadow-md rounded-2xl p-6 flex items-center space-x-4">
                        <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                <FaChartBar className="text-green-600 w-8 h-8" />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-700">Revenue</h2>
                            <p className="text-3xl font-semibold text-green-600">{data.totalRevenue}</p>
                            <p className="text-sm text-gray-500 mt-2">
                                Revenue total généré par Harmony.
                            </p>
                        </div>
                    </article>

                </section>

                <section className="grid grid-cols-1 gap-6 my-6">
                    <article className="bg-white shadow-md rounded-2xl p-6 flex items-center space-x-4">
                        <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                                <FaExclamationTriangle className="text-red-600 w-8 h-8" />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-700">Signalements</h2>
                            <p className="text-3xl font-semibold text-red-600">{data.totalReports}</p>
                            <p className="text-sm text-gray-500 mt-2">
                                Nombre de signalement total.
                            </p>
                        </div>
                    </article>
                </section>

                <section className="grid grid-cols-3 gap-6">
                    <article className="bg-white shadow-md rounded-2xl p-6 flex items-center space-x-4">
                        <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                                <FaExclamationTriangle className="text-red-600 w-8 h-8" />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-700">Non traité </h2>
                            <p className="text-3xl font-semibold text-red-600">{data.unresolvedReports}</p>
                            <p className="text-sm text-gray-500 mt-2">
                                Signalements non traité pour le moment.
                            </p>
                        </div>
                    </article>

                    <article className="bg-white shadow-md rounded-2xl p-6 flex items-center space-x-4">
                        <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                                <BsHourglassSplit className="text-orange-600 w-8 h-8" />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-700">En cours de traitement</h2>
                            <p className="text-3xl font-semibold text-orange-600">{data.inProgressReports}</p>
                            <p className="text-sm text-gray-500 mt-2">
                                Signalements en cours de traitement.
                            </p>
                        </div>
                    </article>

                    <article className="bg-white shadow-md rounded-2xl p-6 flex items-center space-x-4">
                        <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                                <FaClipboardCheck className="text-indigo-600 w-8 h-8" />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-700">Fermés</h2>
                            <p className="text-3xl font-semibold text-indigo-600">{data.closedReports}</p>
                            <p className="text-sm text-gray-500 mt-2">
                                Signalements traité et clos.
                            </p>
                        </div>
                    </article>
                </section>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">


                <div className="bg-white shadow-md rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">Répartition des utilisateurs</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={userData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#82ca9d" label>
                                {userData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={["#2563EB", "#CA8A04"][index]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white shadow-md rounded-2xl p-6">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">Distribution de l'état des signalements</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={reportData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                                {reportData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={["#DC2626", "#EA580C", "#4F45E5"][index]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>


            </div>
        </div>
    );
};

export default Dashboard;