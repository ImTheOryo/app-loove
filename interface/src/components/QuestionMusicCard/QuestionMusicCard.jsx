import "./QuestionMusicCard.css";

function QuestionMusicCard({Question, MusicID}) {



    return (
        <div className="question-music-card">
            <p className="text-center font-semibold text-gray-800 mb-4">
                {Question}
            </p>
            <iframe
                style={{borderRadius: "12px"}}
                src={`https://open.spotify.com/embed/track/${MusicID}?utm_source=generator&theme=1`}
                width="100%"
                height="152"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="spotify"
                className="iframe-spotify"
            >

            </iframe>

        </div>
    )
}

export default QuestionMusicCard;