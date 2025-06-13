import "./Signup.css";
import SignUpEmail from "../../components/SignUpEmail/SignUpEmail";
import {useState} from "react";
import SignUpVerification from "../../components/SignUpVerfication/SignUpVerfication";
import SignUpPassword from "../../components/SignUpPassword/SignUpPassword";
import SignUpInformation from "../../components/SignUpInformation/SignUpInformation";
import SignUpChoice from "../../components/SignUpChoice/SignUpChoice";
import SignUpRelation from "../../components/SignUpRelation/SignUpRelation";
import SignUpImages from "../../components/SignUpImages/SignUpImages";
import SignUpBio from "../../components/SignUpBio/SignUpBio";

document.title = "Harmony | Inscription";

function Signup() {
    const [email, setEmail] = useState("");
    const [stepEmail, setStepEmail] = useState(true);
    const [stepVerification, setStepVerification] = useState(false);
    const [stepPassword, setStepPassword] = useState(false);
    const [stepInformation, setStepInformation] = useState(false);
    const [stepWhatAmI, setStepWhatAmI] = useState(false);
    const [stepWhatISearch, setStepWhatISearch] = useState(false);
    const [stepRelation, setStepRelation] = useState(false);
    const [stepImages, setStepImages] = useState(false);
    const [stepBio, setStepBio] = useState(false);

    return (
        <div className="font-nunito-regular">
            {stepEmail && (
                <SignUpEmail
                    email={email}
                    setStepEmail={setStepEmail}
                    setStepVerification={setStepVerification}
                    setEmail={setEmail}
                />
            )}
            {stepVerification && (
                <SignUpVerification
                    email={email}
                    setStepVerification={setStepVerification}
                    setStepPassword={setStepPassword}
                />
            )}
            {stepPassword && (
                <SignUpPassword
                    email={email}
                    setStepPassword={setStepPassword}
                    setStepInformation={setStepInformation}
                />
            )}
            {stepInformation && (
                <SignUpInformation
                    email={email}
                    setStepInformation={setStepInformation}
                    setWhatAmI={setStepWhatAmI}
                />
            )}
            {stepWhatAmI && (
                <SignUpChoice
                    email={email}
                    name="gender"
                    title="Je suis :"
                    error="Veuillez choisir votre sexe"
                    table={["Un homme", "Une femme", "Au-delà de la binarité"]}
                    setCurrentStep={setStepWhatAmI}
                    setNextStep={setStepWhatISearch}
                />
            )}
            {stepWhatISearch && (
                <SignUpChoice
                    email={email}
                    name="looking"
                    title="Je veux rencontrer :"
                    error="Veuillez choisir les personnes que vous voulez rencontrer"
                    table={["Des hommes", "Des femmes", "Les deux"]}
                    setCurrentStep={setStepWhatISearch}
                    setNextStep={setStepRelation}
                />
            )}
            {stepRelation && (
                <SignUpRelation
                    email={email}
                    setCurrentStep={setStepRelation}
                    setNextStep={setStepImages}
                />
            )}
            {stepImages && (
                <SignUpImages
                    email={email}
                    setCurrentStep={setStepImages}
                    setNextStep={setStepBio}
                />
            )}
            {stepBio && (
                <SignUpBio
                    email={email}
                    setCurrentStep={setStepBio}
                />
            )}
        </div>
    );
}

export default Signup;
