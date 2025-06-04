import "./LikeCard.css";
import {API_BASE_URL} from "../../constants/Constants";

function LikeCard({data}) {
    return (
        <article className="LikeCard">
            <img src={`${API_BASE_URL}/upload/${data.image}`} alt="" loading="lazy" />
        </article>
    )
}

export default LikeCard;