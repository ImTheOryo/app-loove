import "./UserProfileExtended.css";
import { HiMiniXMark } from "react-icons/hi2";
import { API_BASE_URL } from "../../constants/Constants";
import { MdAudiotrack, MdTravelExplore } from "react-icons/md";
import LookingForUserCard from "../LookingForUserCard/LookingForUserCard";
import { GiMirrorMirror, GiOrbitalRays } from "react-icons/gi";
import InterestTag from "../InterestTag/InterestTag";
import QuestionMusicCard from "../QuestionMusicCard/QuestionMusicCard";
import { PiImagesDuotone } from "react-icons/pi";
import { useEffect, useState } from "react";
import ReportModal from "../ReportModal/ReportModal";

function UserProfileExtended({ setShowExtendProfile, userID, report }) {
    const [userInfo, setUserInfo] = useState(null);
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
    const [showModal, setShowModal] = useState(false);
    const styles = isLargeScreen ? { width: '400px', margin: 'auto', overflowY: 'scroll' } : {};

    const getUserInfos = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/profile/extended/${userID}`, {
                method: "GET",
                headers: { "Token": localStorage.getItem("token") },
            });

            const data = await res.json();
            setUserInfo(data.body);
        } catch (err) {
            console.error("Erreur lors du fetch : ", err);
        }
    };

    useEffect(() => {
        getUserInfos();
    }, []);

    if (!userInfo) return <div>Chargement...</div>;

    return (
        <div className="user-profile-extended" style={styles}>

            <ReportModal userID={userID} setShowModal={setShowModal} showModal={showModal}/>

            <button className="user-btn-unexpanded" onClick={() => setShowExtendProfile(prev => !prev)}>
                <HiMiniXMark className="text-3xl text-white" />
            </button>

            <div id="user-profile-expanded-img">
                <img src={`${API_BASE_URL}/upload/${userInfo.image_primary}`} alt="" />
            </div>

            <div id="user-profile-expanded-div" className="font-nunito-regular">
                <section id="user-profile-expanded-content">
                    <article id="user-profile-expanded-info">
                        <h2>{userInfo.user_infos.first_name}, {userInfo.user_infos.age}</h2>
                        <p>{userInfo.user_infos.current}</p>
                    </article>

                    <article>
                        <h2 className="flex items-center mb-3">
                            <MdTravelExplore className="mr-2 text-[#E53E3E]" />
                            Je recherche
                        </h2>
                        <LookingForUserCard LookingFor={userInfo.user_infos.search_type_id} />
                    </article>

                    <article id="user-profile-expanded-biography">
                        <h3>
                            <GiMirrorMirror className="mr-2 text-2xl text-indigo-500" />
                            Biographie
                        </h3>
                        <p>{userInfo.user_infos.biography}</p>
                    </article>

                    <article id="user-profile-expanded-hobbies">
                        <h3>
                            <GiOrbitalRays className="mr-2 text-2xl text-pink-500" />
                            Centre d'intérêt
                        </h3>
                        <div id="user-profile-expanded-hobbies-tag">
                            {userInfo.hobbies.map((item, index) => (
                                <InterestTag key={index} hobby={item} />
                            ))}
                        </div>
                    </article>

                    <article>
                        <h3>
                            <MdAudiotrack className="mr-2 text-2xl text-yellow-500" />
                            This is me
                        </h3>
                        {userInfo.musics.map((item, index) => (
                            <QuestionMusicCard key={index} Question={item.question} MusicID={item.answer} />
                        ))}
                    </article>

                    <article id="user-profile-expanded-gallery">
                        <h3>
                            <PiImagesDuotone className="text-2xl text-cyan-500 mr-2" />
                            Galerie
                        </h3>
                        <div id="user-profile-expanded-gallery-img">
                            {userInfo.images.map((item, index) => (
                                <div key={index} id={`gallery-img-${index + 1}`}>
                                    <img
                                        src={`${API_BASE_URL}/upload/${item}`}
                                        alt=""
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    </article>
                    {
                        report && (
                            <button
                                className="primary-btn"
                                onClick={() => {setShowModal(!showModal)}}
                            >
                                Signaler
                            </button>
                        )
                    }
                </section>
            </div>
        </div>
    );
}

export default UserProfileExtended;
