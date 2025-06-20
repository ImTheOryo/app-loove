import "./LikeCard.css";
import { API_BASE_URL } from "../../constants/Constants";
import { AuthService } from "../../services/AuthService";

function LikeCard({ data, setShowProfile, showProfile, setUserId }) {
    const auth = new AuthService();

    const isSubscribed = auth.isSubscribe();
    const imageStyle = isSubscribed ? {} : { filter: 'blur(10px)' };

    return (
        <article>
            <img
                data-id={data.id}
                className="LikeCard"
                src={`${API_BASE_URL}/upload/${data.image}`}
                alt={data.name || "User profile"}
                loading="lazy"
                style={imageStyle}
                onClick={() => {
                    if (isSubscribed) {
                        setUserId(data.id);
                        setShowProfile(!showProfile);
                    }
                }}
            />

        </article>
    );
}

export default LikeCard;
