import "./ProfileSettings.css";
import {useNavigate} from "react-router";
import {HiMiniXMark} from "react-icons/hi2";
import { IoCamera } from "react-icons/io5";
import { GiWhiteBook, GiMusicalScore } from "react-icons/gi";
import { IoIosArrowForward } from "react-icons/io";
import { FaIdCard } from "react-icons/fa";
import { MdInterests } from "react-icons/md";
import {useState} from "react";
import UserProfileExtended from "../../components/UserProfileExtended/UserProfileExtended";
import ProfileBio from "../../components/ProfileBio/ProfileBio";
import ProfileInterest from "../../components/ProfileInterest/ProfileInterest";
import ProfileMusic from "../../components/ProfileMusic/ProfileMusic";
import ProfileGeneralInfo from "../../components/ProfileGeneralInfo/ProfileGeneralInfo";

function ProfileSettings() {
    const navigate = useNavigate();
    const [showProfile, setShowProfile] = useState(false);
    const [changeBio, setChangeBio] = useState(false);
    const [changePhotos, setChangePhotos] = useState(false);
    const [changeInfos, setChangeInfos] = useState(false);
    const [changeInterest, setChangeInterest] = useState(false);
    const [changeMusic, setChangeMusic] = useState(false);

    const HandleBackButton = () => {
        navigate("/profile");
    }

    return (
        <div className="profile-div">

            {showProfile && (
                <UserProfileExtended key={Math.random()} userID={localStorage.getItem("id")} setShowExtendProfile={setShowProfile} />
            )}

             {changeBio && (
                 <ProfileBio key={Math.random()} changeBio={changeBio} setChangeBio={setChangeBio} />
             )}

            {changeInfos && (
                <ProfileGeneralInfo changeInfos={changeInfos} setChangeInfos={setChangeInfos}/>
            )}

             {changeInterest && (
                 <ProfileInterest key={Math.random()} changeInterest={changeInterest} setChangeInterest={setChangeInterest} />
             )}

            {changeMusic && (
                <ProfileMusic key={Math.random()} changeMusic={changeMusic} setChangeMusic={setChangeMusic}/>
            )}


            <div className={`w-[95%] m-auto ${showProfile || changeBio || changePhotos || changeInfos || changeInterest || changeMusic ? 'hidden' : ''}`}>
                <div className="profile-header">
                    <button className="profile-btn-close" onClick={HandleBackButton}>
                        <HiMiniXMark/>
                    </button>
                    <h2 className="font-poppins-bold">
                        Mon profil
                    </h2>
                    <button className="profile-see-btn font-nunito-regular" onClick={() => setShowProfile(!showProfile)}>
                        voir
                    </button>
                </div>
                <section className="w-[85%] m-auto text-left">
                    <article className="setting-article">
                        <div>
                            <IoCamera className="text-3xl"/>
                            <h2>
                                Photos
                            </h2>
                        </div>
                        <p>
                            <IoIosArrowForward className="text-3xl text-gray-300 ml-auto"/>
                        </p>
                    </article>

                    <article
                        className="setting-article"
                        onClick={() => setChangeBio(!changeBio)}
                    >
                        <div>
                            <GiWhiteBook className="text-3xl"/>
                            <h2>
                                Bio
                            </h2>
                        </div>
                        <p>
                            <IoIosArrowForward className="text-3xl text-gray-300 ml-auto"/>
                        </p>
                    </article>

                    <article
                        className="setting-article"
                        onClick={() => setChangeInfos(!changeInfos)}
                    >
                        <div>
                            <FaIdCard className="text-3xl"/>
                            <h2>
                                Infos de base
                            </h2>
                        </div>
                        <p>
                            <IoIosArrowForward className="text-3xl text-gray-300 ml-auto"/>
                        </p>
                    </article>

                    <article
                        className="setting-article"
                        onClick={() => setChangeInterest(!changeInterest)}
                    >
                        <div>
                            <MdInterests className="text-3xl"/>
                            <h2>
                                Intérêts
                            </h2>
                        </div>
                        <p>
                            <IoIosArrowForward className="text-3xl text-gray-300 ml-auto"/>
                        </p>
                    </article>

                    <article
                        className="setting-article"
                        onClick={()=> setChangeMusic(!changeMusic)}
                    >
                        <div>
                            <GiMusicalScore className="text-3xl"/>
                            <h2>
                                Tes sons favoris
                            </h2>
                        </div>
                        <p>
                            <IoIosArrowForward className="text-3xl text-gray-300 ml-auto"/>
                        </p>
                    </article>

                </section>
            </div>
        </div>
    )
}

export default ProfileSettings;