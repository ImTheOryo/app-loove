import "./ProfileMusicAdd.css";
import React, { useEffect, useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import { API_BASE_URL } from "../../constants/Constants";
import {toast} from "react-toastify";

function ProfileMusicAdd({ onStateChange, setRefresh }) {
    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState("");
    const [musicToSearch, setMusicToSearch] = useState("");
    const [musics, setMusics] = useState([]);
    const [selectedMusic, setSelectedMusic] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleBack = () => {
        setRefresh(false)
        if (onStateChange) {
            onStateChange();
        }
    };

    const getAllQuestions = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/questions`, {
                method: "GET",
            });

            if (res.ok) {
                const data = await res.json();
                setQuestions(data.body || []);
            } else {
                console.error(`Erreur lors de la récupération des questions : ${res.status}`);
            }
        } catch (error) {
            console.error("Erreur réseau :", error);
        }
    };

    useEffect(() => {
        getAllQuestions();
    }, []);

    const handleSelectChange = (event) => {
        const value = event.target.value.trim();
        setSelectedQuestion(value);
        setErrorMessage("");
    };

    const searchMusic = async () => {
        if (musicToSearch.trim().length < 4) {
            return;
        }

        const title = musicToSearch.replaceAll(" ", "+");

        try {
            const response = await fetch(`${API_BASE_URL}/music/title/${title}`, {
                method: 'GET',
            });

            if (response.status === 200) {
                const data = await response.json();
                setMusics(data.body);
            } else {
                console.error(`Erreur lors de la recherche des musiques : ${response.status}`);
            }
        } catch (error) {
            console.error("Erreur réseau :", error);
        }
    };

    const handleSave = async () => {
        if (selectedQuestion.trim() === "" || selectedMusic.trim() === "") {
            toast.error("Veuillez sélectionner une question et une musique valides")
            return;
        }

        await fetch(`${API_BASE_URL}/music/${localStorage.getItem('id')}`,{
            method: "POST",
            body: JSON.stringify({
                question_id: selectedQuestion,
                answer: selectedMusic
            })
        })
        handleBack();
    };

    return (
        <div className={`profile-settings-div`}>
            <button className="profile-btn-close" onClick={handleBack}>
                <HiMiniXMark className="text-l" />
            </button>
            <h3>Choisissez une question</h3>
            <div>
                <select
                    className="question-select"
                    value={selectedQuestion}
                    onChange={handleSelectChange}
                >
                    <option value="" disabled>
                        -- Sélectionnez une question --
                    </option>
                    {questions.map((question) => (
                        <option key={question["id"]} value={question["id"]}>
                            {question["question"]}
                        </option>
                    ))}
                </select>
            </div>

            <div className="music-input">
                <input
                    type="text"
                    placeholder="Entrez le titre d'une chanson"
                    value={musicToSearch}
                    onChange={(event) => setMusicToSearch(event.target.value)}
                />
                <button onClick={searchMusic}>Rechercher</button>
            </div>

            {musics.length > 0 && (
                <div>
                    <div className="music-options">
                        {musics.map((music) => (
                            <div
                                key={music["music_id"]}
                                className={`music-option ${
                                    selectedMusic === music["music_id"] ? "selected" : ""
                                }`}
                                onClick={() => setSelectedMusic(music["music_id"])}
                            >
                                <img
                                    src={music["image_url"]}
                                    alt={music["music_name"]}
                                    className="music-image"
                                />
                                <span>{music["music_name"]}</span>
                                <span>{music["music_artist"]}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <button
                className={"primary-btn mt-8"}
                onClick={handleSave}
            >
                Enregistrer
            </button>
        </div>
    );
}

export default ProfileMusicAdd;