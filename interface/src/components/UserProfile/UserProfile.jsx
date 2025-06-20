import "./UserProfile.css";
import { DiscoveryService } from "../../services/DiscoveryService";
import { LuArrowUp } from "react-icons/lu";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../constants/Constants";
import UserProfileExtended from "../UserProfileExtended/UserProfileExtended";

function UserProfile({ showExtendProfile, setShowExtendProfile, userCount, setUserCount, setCurrentUser }) {
    const discovery = new DiscoveryService();
    const [users, setUsers] = useState([]);
    const userInfo = users[userCount] ? users[userCount] : null;

    const fetchUsers = async () => {
        try {
            const response = await discovery.getDiscovery();
            const data = await response.json();
            setUsers(data.body);
            setUserCount(0);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);


    if (userInfo) {
        const sortedImages = userInfo['image'];

        setCurrentUser(userInfo['infos']['id']);
        return (
            <div>
                <AnimatePresence mode="wait">
                    {!showExtendProfile && (
                        <motion.div
                            key="UserProfileCollapsed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            id="user-profile"
                        >
                            <div>
                                <p className="bg-my-red w-max p-2 rounded-[5px] ml-2 absolute top-4">
                                    {userInfo['distance']}
                                </p>
                                <img
                                    src={`${API_BASE_URL}/upload/${sortedImages[0]['image_name']}`}
                                    alt=""
                                    loading="lazy"
                                />

                            </div>

                            <div>
                                <h2 className="font-nunito-bold">
                                    {userInfo['infos']['first_name']}, {userInfo['infos']['age']}
                                </h2>
                                <p>{userInfo['infos']['current']}</p>
                                <button id="user-profile-expand" onClick={() => setShowExtendProfile((prev) => !prev)}>
                                    <LuArrowUp className="text-3xl text-white" />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {showExtendProfile && (
                        <motion.div
                            key="UserProfileExpanded"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <UserProfileExtended
                                key={Math.random()}
                                setShowExtendProfile={setShowExtendProfile}
                                userID={userInfo['infos']['id']}
                                report={true}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    return <div>en cours</div>;
}

export default UserProfile;