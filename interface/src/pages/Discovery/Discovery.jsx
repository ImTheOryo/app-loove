import "./Discovery.css";
import Navbar from "../../components/Navbar/Navbar";
import UserProfile from "../../components/UserProfile/UserProfile";
import ActionButtons from "../../components/ActionButtons/ActionButtons";

function Discovery() {
    return (
        <div>
            <UserProfile/>
            <ActionButtons/>
            <Navbar/>
        </div>
    )
}

export default Discovery;