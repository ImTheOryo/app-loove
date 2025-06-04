import "./Likes.css";
import Navbar from "../../components/Navbar/Navbar";
import {useEffect, useState} from "react";
import {API_BASE_URL} from "../../constants/Constants";
import LikeCard from "../../components/LikeCard/LikeCard";

function Likes () {
    const [likes, setLikes] = useState([]);
    const [items, setItems] = useState(false);
    const likesArray = [];
    const getLikes = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/likes/${localStorage.getItem('id')}`, {
                method: "GET",
                headers: { "Token": localStorage.getItem('token') },
            });

            if (!res.ok) {
                console.error("Error fetching Likes:", res.status);
                return;
            }

            if (res.status === 200) {
                const data = await res.json();
                const likesData = data.body;

                likesData.map((like) => {
                    likesArray.push(<LikeCard key={Math.random()} data={like} />)
                })
                setLikes(likesArray);
                setItems(true);
            }


        } catch (error) {
            console.error("Erreur lors de la récupération des Likes :",error);
        }
    }
    useEffect(() => {
        getLikes()
    }, [items])

    document.title = "Harmony | Likes"

    return (
        <div className="w-[80%] m-auto">
            <div className="likes-Header">
                <h3>
                    Likes
                </h3>
                <p className="mb-7">
                    Les personnes qui t'on likes
                </p>
            </div>
            <section className="LikesContent">
                {likes}
            </section>
            <Navbar/>
        </div>
    )
}

export default Likes