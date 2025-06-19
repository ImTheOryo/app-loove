import "./Discovery.css";
import Navbar from "../../components/Navbar/Navbar";
import UserProfile from "../../components/UserProfile/UserProfile";
import ActionButtons from "../../components/ActionButtons/ActionButtons";
import PreferencesButton from "../../components/PreferencesButton/PreferencesButton";
import {useEffect, useState} from "react";
import { AnimatePresence, motion } from "motion/react"
import {API_BASE_URL} from "../../constants/Constants";
function Discovery() {
    const [showExtendProfile, setShowExtendProfile] = useState(false);
    const [selected, setSelected] = useState(1);
    const [range, setRange] = useState(50);
    const [minAge, setMinAge] = useState(18);
    const [maxAge, setMaxAge] = useState(30);
    const [userCount, setUserCount] = useState(0);
    const [currentUser, setCurrentUser] = useState();
    document.title = "Harmony | Découvertes";

    const GetFilter = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/filter/${localStorage.getItem("id")}`,{
                method: "GET",
                headers: {Token: localStorage.getItem("token")},
            })

            if (res.status === 200){
                const data = await res.json();

                setMaxAge(data.body["max_age"]);
                setMinAge(data.body["min_age"]);
                setRange(data.body["distance"]);
                setSelected(data.body["wanna_see_id"]);

            }
        } catch (e) {
            console.error("Erreur lors de la récupération des données des filtres : ", e)
        }
    }

    useEffect(() => {
        GetFilter()
    }, []);

    return (
        <div>
            <UserProfile showExtendProfile={showExtendProfile} setShowExtendProfile={setShowExtendProfile} userCount={userCount} setUserCount={setUserCount} setCurrentUser={setCurrentUser}/>

            <motion.div
                key="AnimationShowExtendProfile"
                animate={{
                    opacity: 1
                }}
                transition={{ duration: 0.7 }}
            >
                <ActionButtons showExtendProfile={showExtendProfile} setShowExtendProfile={setShowExtendProfile} currentUser={currentUser} userCount={userCount} setUserCount={setUserCount}/>
            </motion.div>

            <AnimatePresence>
                {!showExtendProfile && (
                    <motion.div
                        key="AnimationNavbar&Preferences"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0 }}
                    >
                        <PreferencesButton selected={selected} setSelected={setSelected} range={range} setRange={setRange} minAge={minAge} setMinAge={setMinAge} maxAge={maxAge} setMaxAge={setMaxAge} />
                        <Navbar/>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Discovery;