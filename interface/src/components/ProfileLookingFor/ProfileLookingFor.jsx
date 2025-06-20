import "./ProfileLookingFor.css";
import {useEffect, useState} from "react";
import {SiFireship} from "react-icons/si";
import {GiLovers, GiMusicalNotes, GiThreeFriends} from "react-icons/gi";
import {API_BASE_URL} from "../../constants/Constants";
import {HiMiniXMark} from "react-icons/hi2";

function ProfileLookingFor ({ showRelation, setShowRelation}) {
    const [selectedIndex, setSelectedIndex] = useState();
    const relationArray = [
        {
            name: "No lyrics, just vibes",
            description: "Le temps d'une musique plutôt exotique",
            icon: <SiFireship className="mr-2 text-2xl text-red-500"/>,
        },
        {
            name: "Feel first, define later’",
            description: "Pour voir où la musique nous mène",
            icon: <GiMusicalNotes className="mr-2 text-2xl text-orange-500"/>,
        },
        {
            name: "Find someone to feat",
            description: "Pour trouver des amis sur la même longueur d'onde",
            icon: <GiThreeFriends className="mr-2 text-2xl text-blue-500"/>,
        },
        {
            name: "Perfect Harmony",
            description: "Pour trouver son harmony",
            icon: <GiLovers className="mr-2 text-2xl text-pink-500"/>,
        }
    ]

    const GetRelation = async () => {
        const res = await fetch(`${API_BASE_URL}/relation/${localStorage.getItem('id')}`,{
            method: "GET",
            headers: {Token: localStorage.getItem("token")},
        })
        if (res.status === 200) {
            const data = await res.json();

            setSelectedIndex(data.body['search_type_id']);
        }
    }

    const SaveRelation = async () => {
        await fetch(`${API_BASE_URL}/relation/${localStorage.getItem('id')}/${selectedIndex}`,{
            method: 'PATCH',
            headers: {Token: localStorage.getItem('token')}
        })
        setShowRelation(!showRelation);
    }

    useEffect(() => {
        GetRelation()
    }, []);

    return (
        <div>
            <button
                className="profile-btn-close"
                onClick={()=>{
                    setShowRelation(!showRelation);
                }}
            >
                <HiMiniXMark className="text-l"/>
            </button>
            <h2>
                Ce que je recherche
            </h2>

            <div className="grid grid-cols-2 mt-8 m-auto gap-4">
                {
                    relationArray.map((relation, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedIndex(index + 1)}
                            className={`w-24 h-24 rounded-2xl flex items-center justify-center m-auto border-[3px] border-gray-300${selectedIndex === index + 1 ? " border-red-500" : "bg-gray-100"}`}
                        >
                            {relation.icon}
                        </div>
                    ))
                }
            </div>

            <h3 className="text-center mt-5 font-poppins-regular font-bold text-xl text-color-my-red">
                {isFinite(selectedIndex)? relationArray[selectedIndex - 1].name : ""}
            </h3>

            <p className="text-center mt-5">
                {isFinite(selectedIndex) ? relationArray[selectedIndex - 1].description : ""}
            </p>

            <button
                className="primary-btn mt-16"
                onClick={()=>{
                    SaveRelation()
                }}
            >
                Sauvegarder
            </button>

        </div>
    )
}

export default ProfileLookingFor;