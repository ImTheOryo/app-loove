import "./SignUpPassword.css"
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {useState} from "react";
import {toast} from "react-toastify";
import {API_BASE_URL} from "../../constants/Constants";

function SignUpPassword({email, setStepPassword, setStepInformation }){
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const pattern = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");

    const HandleClickSetPassword = async (event) => {
        event.preventDefault();
        if (password !== passwordConfirmation) {
            toast.error("Les mots de passe ne sont pas identiques")
        } else {
            if (!pattern.test(password)) {
                toast.error("Le mot de passe ne contient pas tout les critères")
            } else {
                await fetch(`${API_BASE_URL}/register/password`, {
                    method: "POST",
                    body: JSON.stringify({mail: email, password: password})
                });

                setStepPassword(false);
                setStepInformation(true);
            }
        }

    }

    return (
        <div className="sign-up-password pt-28">
            <h2>
                Mot de passe
            </h2>
            <form action="" id="sign-up-password-form">
                <div className="relative w-[90%] max-w-md mx-auto h-[56px] mt-10">
                    <div className="absolute left-[18px] px-1 h-[1px] w-24 bg-white text-sm z-10"></div>
                    <label className="absolute -top-2 left-5 px-1 bg-transparent text-gray-500 text-sm z-10">
                        Mot de passe
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        required
                        className="w-full h-full rounded-[20px] border border-gray-300 bg-white bg-opacity-20 px-4 pt-3  placeholder-transparent focus:outline-none"
                        name="password"
                        id="password"

                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    <button
                        className="absolute inset-y-0 right-7 flex items-center  focus:outline-none"
                        onClick={(event)=>{
                            event.preventDefault();
                            setShowPassword(!showPassword)
                        }}
                    >
                        {showPassword ? <FaEye/> : <FaEyeSlash/> }
                    </button>
                    <p className="text-[10px] text-gray-500">
                        Le mot de passe doit contenir au moins 8 caractères, et au moins : une majuscule, une minuscule, un chiffre et un caractère spécial
                    </p>
                </div>
                <div className="relative w-[90%] max-w-md mx-auto h-[56px] mt-16">
                    <div className="absolute left-[18px] px-1 h-[1px] w-[75px] bg-white text-sm z-10"></div>
                    <label className="absolute -top-2 left-5 px-1 bg-transparent text-gray-500 text-sm z-10">
                        Validation
                    </label>
                    <input
                        type={showConfirmation ? "text" : "password"}
                        required
                        className="w-full h-full rounded-[20px] border border-gray-300 bg-white bg-opacity-20 px-4 pt-3  placeholder-transparent focus:outline-none"
                        name="confirmation-password"
                        id="confirmation-password"
                        onChange={(e)=>setPasswordConfirmation(e.target.value)}
                    />
                    <button
                        className="absolute inset-y-0 right-7 flex items-center  focus:outline-none"
                        onClick={(event)=>{
                            event.preventDefault();
                            setShowConfirmation(!showConfirmation)
                        }}
                    >
                        {showConfirmation ? <FaEye/> : <FaEyeSlash/> }
                    </button>
                </div>
                <button
                    className="primary-btn mt-36 m-auto"
                    onClick={HandleClickSetPassword}
                >
                    Validez
                </button>
            </form>
        </div>
    )
}

export default SignUpPassword;