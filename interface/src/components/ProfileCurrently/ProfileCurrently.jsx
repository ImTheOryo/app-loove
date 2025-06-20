import "./ProfileCurrently.css";
import {HiMiniXMark} from "react-icons/hi2";
import {API_BASE_URL} from "../../constants/Constants";
import {useEffect, useState} from "react";

function ProfileCurrently ({setShowCurrently, showCurrently}) {

    const [current, setCurrent] = useState("");

    const GetCurrent = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/current/${localStorage.getItem('id')}`,{
                method: "GET",
                headers: {Token: localStorage.getItem('token')},
            })

            if (res.status === 200) {
                const data = await res.json();
                setCurrent(data.body.current);
            }
        } catch (e){
            console.error("Erreur lors de la récupération de l'actualité  :", e)
        }
    }

    const SaveCurrent = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/current/${localStorage.getItem('id')}`,{
                method: "PATCH",
                headers: {Token: localStorage.getItem('token')},
                body: JSON.stringify({
                    current: current
                }),
            });

            if (res.status === 200) {
                setShowCurrently(!showCurrently);
            }
        } catch (e){
            console.error("Une erreur lors de la sauvegarde : ", e)
        }
    }

    useEffect(() => {
        GetCurrent()
    }, []);

    return(
        <div>
            <button
                className="profile-btn-close"
                onClick={()=>{
                    setShowCurrently(!showCurrently);
                }}
            >
                <HiMiniXMark className="text-l"/>
            </button>
            <h2>
                Ce que je suis
            </h2>

            <div className="relative w-[90%] max-w-md mx-auto h-[56px] mt-10">
                <div className="absolute left-[18px] px-1 h-[1px] w-[90px] bg-white text-sm z-10"></div>
                <label className="absolute -top-2 left-5 px-1 bg-transparent text-gray-500 text-sm z-10">
                    Mon activité
                </label>
                <input
                    type="text"
                    required
                    className="w-full h-full rounded-[20px] border border-gray-300 bg-white bg-opacity-20 px-4 pt-3 focus:outline-none"
                    name="current"
                    id="current"
                    placeholder={"Ex : Étudiant"}
                    maxLength={32}
                    value={current}
                    onChange={(e) => {
                        setCurrent(e.target.value)
                    }}
                />
            </div>

            <button
                className="primary-btn mt-12"
                onClick={() => SaveCurrent()}
            >
                Sauvegarder
            </button>
        </div>
    )
}

export default ProfileCurrently;