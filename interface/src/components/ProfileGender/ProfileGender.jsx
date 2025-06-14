import "./ProfileGender.css";
import {FaCheck} from "react-icons/fa6";
import {HiMiniXMark} from "react-icons/hi2";
import {useEffect, useState} from "react";
import {API_BASE_URL} from "../../constants/Constants";

function ProfileGender ({showGender, setShowGender}) {

    const table = ["Un homme", "Une femme", "Au-delà de la binarité"];
    const [checked, setChecked] = useState(null);

    const SaveGender = async () => {
        await fetch(`${API_BASE_URL}/gender/${localStorage.getItem('id')}/${checked}`,{
            method: 'PATCH',
            headers: {Token: localStorage.getItem('token')}
        })
        setShowGender(!showGender);
    }

    const GetGender = async () => {
        const res = await fetch(`${API_BASE_URL}/gender/${localStorage.getItem('id')}`,{
            method: "GET",
            headers: {Token: localStorage.getItem('token')},
        })

        if (res.status === 200){
            const data = await res.json();
            setChecked(data.body['gender_id'])
        }
    }

    useEffect(() => {
        GetGender()
    }, []);

    return(
        <div>
            <button className="profile-btn-close" onClick={() =>{ setShowGender(!showGender)}}>
                <HiMiniXMark className="text-l"/>
            </button>
            <h2>
                Mon genre
            </h2>

            <div>
                {
                    table.map((item, index) => (
                        <label className={`label-input ${checked == (index + 1) ? "input-selected" : ""}`}>
                            <input
                                type="radio"
                                name="gender"
                                value={index + 1}
                                required
                                onChange={(e) => {
                                    setChecked(e.target.value);
                                }}
                            />
                            {item}

                            <FaCheck className={`text-right self-center ${checked == (index + 1) ? "text-white" : "text-gray-400"}`} />
                        </label>
                    ))
                }
            </div>

            <button
                className="primary-btn mt-16"
                onClick={()=>{
                    SaveGender()
                }}
            >
                Sauvegarder
            </button>
        </div>
    )
}

export default ProfileGender;