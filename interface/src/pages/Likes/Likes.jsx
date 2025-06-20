import "./Likes.css";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../constants/Constants";
import LikeCard from "../../components/LikeCard/LikeCard";
import UserProfileExtended from "../../components/UserProfileExtended/UserProfileExtended";
import ActionButtons from "../../components/ActionButtons/ActionButtons";
import ActionButtonPremium from "../../components/ActionButtonPremium/ActionButtonPremium";

function Likes() {
    const [likes, setLikes] = useState([]);
    const [showProfile, setShowProfile] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userIDExtended, setUserIDExtended] = useState(1);

    const getLikes = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/likes/${localStorage.getItem('id')}`, {
                method: "GET",
                headers: { "Token": localStorage.getItem('token') },
            });

            if (res.status === 200) {
                const data = await res.json();
                setLikes(data.body);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des Likes :", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getLikes();
    }, []);

    document.title = "Harmony | Likes";

    return (
        <div>
            {showProfile && (
                <div>
                    <UserProfileExtended userID={userIDExtended} setShowExtendProfile={setShowProfile} report={false}/>
                    <ActionButtonPremium currentUser={userIDExtended}/>
                </div>
            )}
            {!showProfile && (
                <div className="w-[80%] m-auto">
                    <div className="likes-Header">
                        <h3>Likes</h3>
                        <p className="mb-7">Les personnes qui t'ont liké</p>
                    </div>
                    <section className="LikesContent">
                        {loading ? (
                            <p>Chargement en cours...</p>
                        ) : likes.length > 0 ? (
                            likes.map((like) => (
                                <LikeCard
                                    key={like.id}
                                    data={like}
                                    setShowProfile={setShowProfile}
                                    showProfile={showProfile}
                                    setUserId={setUserIDExtended}
                                />
                            ))
                        ) : (
                            <p>Aucun like pour le moment.</p>
                        )}
                    </section>
                    <Navbar />
                </div>
            )}
        </div>
    );
}

export default Likes;
