import "./UserProfileExtended.css";
import {HiMiniXMark} from "react-icons/hi2";
import {API_BASE_URL} from "../../constants/Constants";
import {MdAudiotrack, MdTravelExplore} from "react-icons/md";
import LookingForUserCard from "../LookingForUserCard/LookingForUserCard";
import {GiMirrorMirror, GiOrbitalRays} from "react-icons/gi";
import InterestTag from "../InterestTag/InterestTag";
import QuestionMusicCard from "../QuestionMusicCard/QuestionMusicCard";
import {PiImagesDuotone} from "react-icons/pi";

function UserProfileExtended({setShowExtendProfile, userInfo}) {

    console.log(userInfo)
    const images = [];

    const sortedImages = userInfo['images'].sort((a, b) => b.image_primary - a.image_primary);
    for (let i = 1; i < sortedImages.length; i++) {
        images.push(sortedImages[i]);
    }

    return (
        <div className="user-profile-extended">
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
                        <LookingForUserCard LookingFor={userInfo['infos']['search_type_id']}/>

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
        </div>
    )
}

export default UserProfileExtended;