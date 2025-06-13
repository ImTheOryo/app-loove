import "../ProfileBio/ProfileBio.css";
import {API_BASE_URL} from "../../constants/Constants";
import {useState} from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router";

function SignUpBio({email, setCurrentStep}) {
    const [biography, setBiography] = useState("");
    const navigate = useNavigate();

    const handleRegisterBio = async () => {
        await fetch(`${API_BASE_URL}/register/biography`, {
            method: "POST",
            body: JSON.stringify({
                email: email,
                biography: biography,
            }),
        });
        setCurrentStep(false);
        toast.success("Votre compte a été créer avec success");
        navigate("/connexion");

    }

    return (
        <div className="profile-settings-div">
            <h2>
                Ma bio
            </h2>
            <textarea
                value={biography}
                onChange={(e) => setBiography(e.target.value)}
                className="bg-gray-100"
            />
            <button className="btn-send-bio" onClick={handleRegisterBio}>
                Continuer
            </button>
        </div>
    )
}

export default SignUpBio;