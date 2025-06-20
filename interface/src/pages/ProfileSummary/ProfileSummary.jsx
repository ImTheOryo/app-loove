import "./ProfileSummary.css";
import Navbar from "../../components/Navbar/Navbar";
import { FaPencilAlt } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import { IoCheckmarkOutline } from "react-icons/io5";
import {useEffect, useState} from "react";
import {API_BASE_URL} from "../../constants/Constants";
import {useNavigate} from "react-router";
import Spinner from "../../components/Spinner/Spinner";


function ProfileSummary() {
    const [firstName, setFirstName] = useState("");
    const [age, setAge] = useState();
    const [image, setImage] = useState("");
    const navigate = useNavigate();


    const GotoPremium = () => {
        navigate("/premium")
    }
    const handleClick = () => {
        navigate(`/profile/settings`)
    };

    const getUserData = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/profile/${localStorage.getItem("id")}`, {
                method: "GET",
                headers: { "Token": localStorage.getItem("token") },
            })

            const data = await res.json();
            setFirstName(data.body.first_name);
            setAge(data.body.age);
            setImage(data.body.image_name);
        } catch (error) {
            console.error("Erreur lors de la récupération des données de l'utilisateur : ", error)
        }
    };

    useEffect(() => {
        getUserData();
    }, [firstName, age, image]);

    document.title = "Harmony | Profile";

    return (
        <div className="bg-[#F2F2F2] h-screen">
            {!isNaN(image) ? (
                <Spinner/>
            ) : (
                <div>
                    <div className="absolute top-0 left-0 w-full h-80 bg-white rounded-b-[50%] z-0" />
                    <div className="profile-section">
                        <div className="profile-section-img object-cover">
                            <img src={`${API_BASE_URL}/upload/${image}`} alt="Avatar" loading="lazy" />
                        </div>
                        <h2 className="mt-4 text-xl font-semibold mb-2 font-poppins-bold">
                            {firstName}, {age}
                        </h2>
                        <button className="profile-modify" onClick={handleClick}>
                            <FaPencilAlt className="text-color-my-red"/>
                        </button>
                    </div>

                    <div className="flex flex-col items-center px-4 py-6 gap-4">

                        <section className="bg-white w-[90%] rounded-xl p-4 space-y-4 mt-7">
                            <div className="grid grid-cols-3 text-center font-bold text-[#E94057] font-nunito-bold">
                                <div>Fonctionnalités</div>
                                <div>FREE</div>
                                <div>PREMIUM</div>
                            </div>

                            <div className="avantage-section">
                                <div>Voir qui t'a liké</div>
                                <div className="flex justify-center"><HiXMark className="text-red-400 w-6 h-6" /></div>
                                <div className="flex justify-center"><IoCheckmarkOutline className="text-green-500 w-6 h-6" /></div>
                            </div>

                            <div className="avantage-section">
                                <div>Envoyez un message avant de matcher</div>
                                <div className="flex justify-center"><HiXMark className="text-red-400 w-6 h-6" /></div>
                                <div className="flex justify-center"><IoCheckmarkOutline className="text-green-500 w-6 h-6" /></div>
                            </div>
                        </section>

                        <button
                            className="button-premium font-poppins-bold"
                            onClick={() => {
                                GotoPremium()
                            }}
                        >
                            Passez à Harmony Premium
                        </button>
                    </div>
                    <Navbar/>
                </div>
            )}
        </div>
    )
}

export default ProfileSummary;