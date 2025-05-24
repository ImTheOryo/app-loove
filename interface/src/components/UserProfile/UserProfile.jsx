import "./UserProfile.css";
import {DiscoveryService} from "../../services/DiscoveryService";
import InterestTag from "../InterestTag/InterestTag";
import QuestionMusicCard from "../QuestionMusicCard/QuestionMusicCard";
import LookingForUserCard from "../LookingForUserCard/LookingForUserCard";
import { LuArrowUp } from "react-icons/lu";
import { MdTravelExplore, MdAudiotrack } from "react-icons/md";
import { GiOrbitalRays, GiMirrorMirror } from "react-icons/gi";
import { PiImagesDuotone } from "react-icons/pi";
import { HiMiniXMark } from "react-icons/hi2";
import { AnimatePresence, motion } from "motion/react";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {API_BASE_URL} from "../../constants/Constants";

function UserProfile({showExtendProfile, setShowExtendProfile, userCount, setUserCount, setCurrentUser}) {
    const discovery = new DiscoveryService();
    const [users, setUsers] = useState([]);
    let images = [];


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await discovery.getDiscovery();
                if (response.status === 401) {
                    toast.error("Mail ou mot de passe incorrect");
                    return;
                }
                const data = await response.json();
                setUsers(data.body);
                setUserCount(0);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);


    const userInfo = users[userCount] ? users[userCount] : null;

    if (isNaN(userInfo)){
        setCurrentUser(userInfo['infos']['id'])
        const sortedImages = userInfo['images'].sort((a, b) => b.image_primary - a.image_primary);
        for (let i = 1; i < sortedImages.length; i++) {
            images.push(sortedImages[i]);
        }

        return (
            <div>
                <AnimatePresence mode="wait">
                    {!showExtendProfile && (
                        <motion.div
                            key="UserProfileCollapsed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            id="user-profile"
                        >
                            <img src={`${API_BASE_URL}/upload/${sortedImages[0]['image_name']}`} alt="" loading="lazy"/>
                            <div>
                                <h2 className="font-nunito-bold">
                                    {userInfo['infos']['first_name']}, {userInfo['infos']['age']}
                                </h2>
                                <p>
                                    {userInfo['infos']['current']}
                                </p>
                                <button id="user-profile-expand" onClick={()=> setShowExtendProfile(prev => !prev)}>
                                    <LuArrowUp className="text-3xl text-white"/>
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>


                <AnimatePresence>
                    {showExtendProfile && (
                        <motion.div
                            key="UserProfileExpanded"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            id="user-profile-expanded"
                        >
                            <button id="user-btn-unexpanded" onClick={()=> setShowExtendProfile(prev => !prev)}>
                                <HiMiniXMark className="text-3xl text-white"/>
                            </button>
                            <div id="user-profile-expanded-img" >
                                <img src={`${API_BASE_URL}/upload/${sortedImages[0]['image_name']}`} alt=""/>
                            </div>
                            <div id="user-profile-expanded-div" className="font-nunito-regular">
                                <section id="user-profile-expanded-content">
                                    <article id="user-profile-expanded-info">
                                        <h2>
                                            {userInfo['infos']['first_name']}, {userInfo['infos']['age']}
                                        </h2>
                                        <p>
                                            {userInfo['infos']['current']}
                                        </p>
                                    </article>
                                    <article>
                                        <h2 className="flex items-center mb-3">
                                            <MdTravelExplore className="mr-2 text-[#E53E3E]"/>
                                            Je recherche
                                        </h2>
                                        <LookingForUserCard LookingFor= {userInfo['infos']['search_type_id']}/>

                                    </article>
                                    <article id="user-profile-expanded-biography">
                                        <h3>
                                            <GiMirrorMirror className="mr-2 text-2xl text-indigo-500"/>
                                            Biographie
                                        </h3>
                                        <p>
                                            {userInfo['infos']['biography']}
                                        </p>
                                    </article>
                                    <article id="user-profile-expanded-hobbies">
                                        <h3>
                                            <GiOrbitalRays className="mr-2  text-2xl text-pink-500"/>
                                            Centre d'intéret
                                        </h3>
                                        <div id="user-profile-expanded-hobbies-tag">
                                            {userInfo['hobbies'].map((item) => <InterestTag hobby={item.hobby}/>)}
                                        </div>
                                    </article>
                                    <article>
                                        <h3>
                                            <MdAudiotrack className="mr-2 text-2xl text-yellow-500"/>
                                            This is me
                                        </h3>
                                        {userInfo["musics"].map(item => <QuestionMusicCard Question={item.question} MusicID={item.answer}/>)}
                                    </article>
                                    <article id="user-profile-expanded-gallery">
                                        <h3>
                                            <PiImagesDuotone className="text-2xl text-cyan-500 mr-2"/>
                                            Galerie
                                        </h3>
                                        <div id="user-profile-expanded-gallery-img">
                                            {images.map((item, index) => <div id={`gallery-img-${index + 1}`}><img src={`${API_BASE_URL}/upload/${item['image_name']}`} alt="" loading="lazy"/></div> )}
                                        </div>
                                    </article>
                                </section>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>

        )
    }
    return (
        <div>
            en cours
        </div>
    )

}

export default UserProfile;