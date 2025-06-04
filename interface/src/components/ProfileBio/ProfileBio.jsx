import "./ProfileBio.css";
import { FaArrowLeft } from "react-icons/fa6";
import {useEffect, useState} from "react";
import {API_BASE_URL} from "../../constants/Constants";

function ProfileBio({setChangeBio, changeBio}) {
    const [bio, setBio] = useState(false);
    const [biography, setBiography] = useState("");
    const getBiography = async () => {
        const res = await fetch(`${API_BASE_URL}/biography/${localStorage.getItem("id")}`, {
            method: "GET",
            headers: { "Token": localStorage.getItem("token") },
        });
        if (res.status === 200) {
            const data = await res.json();
            setBiography(data.body.biography);
        }

    }

    const updateBiography = async () => {
        await fetch(`${API_BASE_URL}/biography/${localStorage.getItem("id")}`, {
            method: "PATCH",
            headers: { "Token": localStorage.getItem("token") },
            body: JSON.stringify(biography),
        });

        setChangeBio(false);
    }
    useEffect( () => {
        getBiography();
        setBio(true);
    }, [bio]);

    return (
        <div className="profile-settings-div">
            <button className="btn-back-profile" onClick={() => setChangeBio(!changeBio)}>
                <FaArrowLeft/>
            </button>
            <h2>
                Ma bio
            </h2>
            <textarea value={biography} onChange={(e) => setBiography(e.target.value)}/>
            <button className="btn-send-bio" onClick={()=>{updateBiography()}}>
                Enregistrer
            </button>
        </div>
    )
}

export default ProfileBio;