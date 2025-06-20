import "./ProfileGeneralInfo.css";
import {HiMiniXMark} from "react-icons/hi2";
import {IoIosArrowForward} from "react-icons/io";
import {useState} from "react";
import ProfileGender from "../ProfileGender/ProfileGender";
import { FaTransgenderAlt } from "react-icons/fa";
import { GiMagnifyingGlass } from "react-icons/gi";
import { TbFileCv } from "react-icons/tb";
import ProfileLookingFor from "../ProfileLookingFor/ProfileLookingFor";
import ProfileCurrently from "../ProfileCurrently/ProfileCurrently";


function ProfileGeneralInfo ({setChangeInfos, changeInfos}) {
    const [showGender, setShowGender] = useState(false);
    const [showRelation, setShowRelation] = useState(false)
    const [showCurrently, setShowCurrently] = useState(false);

    return(
        <div className="profile-settings-div">

            { showGender && (
                <ProfileGender showGender={showGender} setShowGender={setShowGender}/>
            )}

            { showRelation && (
                <ProfileLookingFor showRelation={showRelation} setShowRelation={setShowRelation}/>
            )}
            { showCurrently && (
                <ProfileCurrently setShowCurrently={setShowCurrently} showCurrently={showCurrently}/>
            )}


            { !showGender && !showRelation && !showCurrently && (
                <>
                    <button className="profile-btn-close" onClick={() => setChangeInfos(!changeInfos)}>
                        <HiMiniXMark className="text-l"/>
                    </button>
                    <h2>
                        Mes informations
                    </h2>

                    <section className="general-infos-section">
                        <article
                            className="setting-article"
                            onClick={() => {setShowGender(!showGender)}}
                        >
                            <FaTransgenderAlt className="text-2xl mr-3"/>
                            Mon genre
                            <IoIosArrowForward className="text-3xl text-gray-300 ml-auto"/>
                        </article>
                        <article
                            className="setting-article"
                            onClick={()=>{setShowRelation(!showRelation)}}
                        >
                            <GiMagnifyingGlass className="text-2xl mr-3"/>
                            Ce que je recheche
                            <IoIosArrowForward className="text-3xl text-gray-300 ml-auto"/>
                        </article>
                        <article
                            className="setting-article"
                            onClick={() => {setShowCurrently(!showCurrently)}}
                        >
                            <TbFileCv className="text-2xl mr-3"/>
                            Je suis actuellement
                            <IoIosArrowForward className="text-3xl text-gray-300 ml-auto"/>
                        </article>
                    </section>
                </>
            )}
        </div>
    )
}

export default ProfileGeneralInfo;