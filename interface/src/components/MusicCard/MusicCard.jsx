import "./MusicCard.css";
import { FiPlus } from "react-icons/fi";
import {API_BASE_URL} from "../../constants/Constants";

function MusicCard({ data, setRefresh, showQuestion, setShowQuestion}) {
    const HandleDeleteMusicQuestion = async () => {
        await fetch(`${API_BASE_URL}/music/${data["question_id"]}`,{
            method: "DELETE",
        })
        setRefresh(false);
    };

    if (isNaN(data)) {
        return (
            <article
                className="music-card-article flex-col py-2 relative"
            >
                <button
                    onClick={HandleDeleteMusicQuestion}
                >
                    Supprimer
                </button>
                <p className="music-card-question">
                    {data["question"]}
                </p>
                <div className="music-card-content flex items-center">
                    <div className="music-card-image">
                        <img src={data["answer"]["image_url"]} alt="Music cover" />
                    </div>
                    <div className="music-card-text text-left">
                        <h3>{data["answer"]["music_name"]}</h3>
                        <p>{data["answer"]["music_artist"]}</p>
                    </div>
                </div>
            </article>
        );
    } else {
        return (
            <article className="music-card-article placeholder-card" onClick={()=>{setShowQuestion(!showQuestion)}}>
                <FiPlus className="text-white text-2xl bg-[#E94057FF] rounded-full my-6" />
            </article>
        );
    }
}

export default MusicCard;