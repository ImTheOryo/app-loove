import "./ProfileInterest.css";
import "../../pages/ProfileSettings/ProfileSettings.css";
import { API_BASE_URL } from "../../constants/Constants";
import { useEffect, useState } from "react";
import InterestTag from "../InterestTag/InterestTag";
import {HiMiniXMark} from "react-icons/hi2";

function ProfileInterest({ setChangeInterest, changeInterest }) {
    const [interests, setInterests] = useState([]);
    const [userInterests, setUserInterests] = useState([]);

    const fetchInterests = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/hobbies`, {
                method: "GET",
                headers: { "Token": localStorage.getItem("token") },
            });
            const data = await res.json();

            const userRes = await fetch(`${API_BASE_URL}/hobby/${localStorage.getItem("id")}`, {
                method: "GET",
                headers: { "Token": localStorage.getItem("token") },
            });
            const userData = await userRes.json();

            setInterests(data.body);
            setUserInterests(userData.body);
        } catch (error) {
            console.error("Error fetching interests:", error);
        }
    };


    const handleClick = async (event) => {
        try {
            await fetch(`${API_BASE_URL}/hobby/${localStorage.getItem("id")}/${event.currentTarget.dataset.id}`, {
                method: "PATCH",
                headers: { "Token": localStorage.getItem("token") },
            });
            fetchInterests();
        } catch (error) {
            console.error("Error updating hobby:", error);
        }
    };

    useEffect(() => {
        fetchInterests();
    }, []);

    return (
        <div className="profile-settings-div">
            <button className="profile-btn-close" onClick={() => setChangeInterest(!changeInterest)}>
                <HiMiniXMark />
            </button>
            <h2>Mes intérêts</h2>
            <div className="profile-interests-div">
                {interests.map((item) => {
                    const selected = userInterests.some((userHobby) => userHobby.hobby_id === item.id);
                    return (
                        <InterestTag
                            key={item.id}
                            hobby={item.hobby}
                            selected={selected}
                            clickable={handleClick}
                            hobby_id={item.id}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default ProfileInterest;
