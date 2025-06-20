import "./Admin.css"
import HarmonyLogo from "../../assets/images/Harmony.webp";
import AdminCard from "../../components/AdminCard/AdminCard";
import { LuClipboardList } from "react-icons/lu";
import { AiOutlineLineChart } from "react-icons/ai";
import { TbUsersGroup } from "react-icons/tb";
import { GoShieldLock } from "react-icons/go";
import { TbReportMoney } from "react-icons/tb";
import {Link, Outlet, useLocation} from "react-router";
import {useEffect} from "react";

function Admin() {
    const location = useLocation();
    const changeCurrentTitle = () => {
        const raw = location.pathname.replace("/administrateur/", "").split('/')[0]; // Garde seulement la première partie
        const formatted = raw
            .replace(/-/g, ' ')
            .replace(/^./, c => c.toUpperCase());
        document.getElementById("title").textContent = formatted;
        document.title = `Admin | ${formatted}`;
    };

    useEffect(() => {
        changeCurrentTitle();
        // eslint-disable-next-line
    }, [location.pathname]);
    return (
        <div className="bg-[#FAFAFA]">

            <div className="w-[18%] h-screen bg-[#FFFFFF] mt-2">
                <div className="flex flex-row items-center justify-center">
                    <img src={HarmonyLogo} alt="Harmony logo" className="w-1/3"/>
                    <div>
                        <p className="font-quicksand-regular text-3xl">Harmony</p>
                        <p className="font-nunito-regular">Admin panel</p>
                    </div>
                </div>
                <div className="w-[82%] h-[11%] bg-[#FFFFFF] fixed top-0 right-0 flex justify-between  items-center">
                    <p className="text-grid-2-3 text-4xl font-nunito-bold font-bold" id="title">
                        Test
                    </p>
                    <div className="profile-grid-3 justify-self-end mr-5">
                        <AdminCard />
                    </div>

                </div>
                <div className="flex flex-col items-center justify-center mt-6">
                    <Link to="/administrateur/tableau-de-bord" className="admin-btn" >
                        <LuClipboardList className="text-4xl"/>
                        <p>Dashboard</p>
                    </Link>
                    <Link to="/administrateur/utilisateurs" className="admin-btn">
                        <TbUsersGroup className="text-4xl"/>
                        <p>Utilisateurs</p>
                    </Link>
                    <Link to="/administrateur/moderation" className="admin-btn">
                        <GoShieldLock className="text-4xl"/>
                        <p>Modération</p>
                    </Link>
                </div>
            </div>

            <div className="container-outlet ">
                <Outlet/>
            </div>
        </div>
    )
}

export default Admin;