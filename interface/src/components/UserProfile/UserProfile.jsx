import "./UserProfile.css";
import IMAGE from "../../assets/images/1943faa02496076cb075871aae65e1767b206779.jpg";
import Gallery1 from "../../assets/images/5ac6d441f1f880b1b8215d7bc395a700f265159d.jpg";
import Gallery2 from "../../assets/images/5df9497d839480c156645bc78499decd454110fc.jpg";
import Gallery3 from "../../assets/images/ca876c58ddc0a7347fbce7db2120a4a1deabd31e.jpg";
import Gallery4 from "../../assets/images/ccce740aaddb1c0125aa5683f357775f2d002495.jpg";
import Gallery5 from "../../assets/images/fdf84c0590e036eddf7821a385faca1c06065912.jpg";
import InterestTag from "../InterestTag/InterestTag";
import QuestionMusicCard from "../QuestionMusicCard/QuestionMusicCard";
import { LuArrowUp } from "react-icons/lu";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { GiOrbitalRays, GiMirrorMirror } from "react-icons/gi";
import { PiImagesDuotone } from "react-icons/pi";



function UserProfile() {
    const myHobby = ["Jeux-vidéo", "Sport", "Art", "Musique", "Cuisine", "Lecture"];
    const answersmusic = new Map([
        ["Je ne vais pas en boite s'il n'y a pas cette musique", "3eekarcy7kvN4yt5ZFzltW"],
        ["Ma musique du moment", "3qrTll9OQ9wcejTxPFY0qg"],
        ["Si tu met cette musique je danse direct", "3qQbCzHBycnDpGskqOWY0E"],
    ]);
    return (
        <div>
            <div id="user-profile" className="hidden">
                <img src={IMAGE} alt="" loading="lazy"/>
                <div>
                    <h2 className="font-nunito-bold">
                        Julie, 24
                    </h2>
                    <p>
                        Agricultrice
                    </p>
                    <button id="user-profile-expand">
                        <LuArrowUp className="text-3xl text-white"/>
                    </button>
                </div>
            </div>
            <div id="user-profile-expanded" className="" >
                <div id="user-profile-expanded-img" >
                    <img src={IMAGE} alt=""/>
                </div>
                <div id="user-profile-expanded-div" className="font-nunito-regular">
                    <section id="user-profile-expanded-content">
                        <article id="user-profile-expanded-info">
                            <h2>
                                Julie, 24
                            </h2>
                            <p>
                                Agricultrice
                            </p>
                        </article>
                        <article>
                            <h2 className="flex items-center">
                                <HiOutlineMagnifyingGlass className="mr-2"/>
                                Je recherche
                            </h2>

                        </article>
                        <article id="user-profile-expanded-biography">
                            <h3>
                                <GiMirrorMirror className="mr-2 text-2xl text-indigo-500"/>
                                Biographie
                            </h3>
                            <p>
                                Test test ets estt tstestsetsttset sttest sttsetset sttest
                            </p>
                        </article>
                        <article id="user-profile-expanded-hobbies">
                            <h3>
                                <GiOrbitalRays className="mr-2  text-2xl text-pink-500"/>
                                Centre d'intéret
                            </h3>
                            <div id="user-profile-expanded-hobbies-tag">
                                {myHobby.map((hobby) => <InterestTag hobby={hobby}/>)}
                            </div>
                        </article>
                        {[...answersmusic.entries()].map(([key, value]) => <QuestionMusicCard Question={key} MusicID={value}/>)}
                        <article id="user-profile-expanded-gallery">
                            <h3>
                                <PiImagesDuotone className="text-2xl text-cyan-500 mr-2"/>
                                Galerie
                            </h3>
                            <div id="user-profile-expanded-gallery-img">
                                <div id="gallery-img-1">
                                    <img src={Gallery1} alt="" loading="lazy"/>
                                </div>
                                <div id="gallery-img-2">
                                    <img src={Gallery2} alt="" loading="lazy"/>
                                </div>
                                <div id="gallery-img-3">
                                    <img src={Gallery3} alt="" loading="lazy"/>
                                </div>
                                <div id="gallery-img-4">
                                    <img src={Gallery4} alt="" loading="lazy"/>
                                </div>
                                <div id="gallery-img-5">
                                    <img src={Gallery5} alt="" loading="lazy"/>
                                </div>
                            </div>
                        </article>
                    </section>
                </div>
            </div>
        </div>

)
}

export default UserProfile;