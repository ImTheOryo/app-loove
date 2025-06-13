import "./ProfileMusic.css";
import { HiMiniXMark } from "react-icons/hi2";
import MusicCard from "../MusicCard/MusicCard";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../constants/Constants";
import ProfileMusicAdd from "../../pages/ProfileMusicAdd/ProfileMusicAdd";

function ProfileMusic({ changeMusic, setChangeMusic }) {
    const [musicCards, setMusicCards] = useState([]);
    const [isFetched, setIsFetched] = useState(false);
    const [showAddNewMusic, setShowAddNewMusic] = useState(false);

    const toggleChangeMusic = () => {
        setChangeMusic(!changeMusic);
    };

    const fetchMusics = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/musics/${localStorage.getItem("id")}`, {
                method: "GET",
            });

            if (res.status === 200) {
                const data = await res.json();
                setMusicCards(data.body || []);
            } else if (res.status === 204) {
                setMusicCards([]);
            } else {
                console.error(`Erreur lors de la récupération des musiques : ${res.status}`);
            }
        } catch (error) {
            console.error("Erreur réseau :", error);
        } finally {
            setIsFetched(true);
        }
    };

    useEffect(() => {
        fetchMusics();
    }, [isFetched]);

    const renderMusicCards = () => {
        const paddedMusicCards = [...musicCards];
        while (paddedMusicCards.length < 3) {
            paddedMusicCards.push(null);
        }
        return paddedMusicCards.map((item, index) => (
            <MusicCard
                key={index}
                data={item}
                setRefresh={setIsFetched}
                setShowQuestion={setShowAddNewMusic}
                showQuestion={showAddNewMusic}
            />
        ));
    };

    return (
        <div>
            {!showAddNewMusic && (
                <div className="profile-settings-div">
                    <button
                        className="profile-btn-close"
                        onClick={toggleChangeMusic}
                    >
                        <HiMiniXMark className="text-l" />
                    </button>
                    <h2>Mes musiques</h2>
                    <p>
                        Réponds aux questions de ton choix pour faire ressortir ta
                        personnalité musicale.
                    </p>
                    <section>{renderMusicCards()}</section>
                    <button className="primary-btn" onClick={toggleChangeMusic}>
                        Enregistrer
                    </button>
                </div>
            )}
            {showAddNewMusic && (
                <ProfileMusicAdd
                    setRefresh={setIsFetched}
                    onStateChange={() => setShowAddNewMusic(false)}
                />
            )}
        </div>
    );
}

export default ProfileMusic;
