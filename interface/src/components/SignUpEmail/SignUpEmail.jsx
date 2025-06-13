import "./SignUpEmail.css";
import {useNavigate} from "react-router";
import {API_BASE_URL} from "../../constants/Constants";
import {toast} from "react-toastify";

function SignUpEmail({email, setStepEmail, setStepVerification , setEmail}) {
    const navigate = useNavigate();

    const HandleSendMail = async () => {

        const form = document.getElementById("email-register");

        if (!form.checkValidity()) {
            toast.error("Veuillez renseigner un mail valide");
            return;
        }

        const data = new FormData(form);

        const response = await fetch(`${API_BASE_URL}/register/mail`, {
            method: "POST",
            body: data,
        })

        if (response.status === 208) {
            toast.error("Mail déjà utilisé");
        } else if (response.status === 200) {
            setStepEmail(false);
            setStepVerification(true);
        }
    }

    const HandleBackBtn = () => {
        navigate("/");
    }


    return (
        <div className="email-sign-up pt-28">
            <h2>
                Mon E-mail
            </h2>
            <p>
                Veuillez renseigner un mail valide. Nous vous enverrons un code a 4 chiffres.
            </p>

            <form action="" id="email-register">
                <div className="sign-up-mail-input">
                    <div className="absolute left-[18px] px-1 h-[1px] w-14 bg-white text-sm z-10"></div>
                    <label className="absolute -top-2 left-5 px-1 bg-transparent text-gray-500 text-sm z-10">
                        E-mail
                    </label>
                    <input
                        type="email"
                        required
                        className="w-full h-full rounded-[20px] border border-gray-300 bg-white bg-opacity-20 px-4 pt-3 placeholder-transparent focus:outline-none "
                        name="mail"
                        id="mail"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </div>
            </form>

            <button
                className="primary-btn"
                onClick={HandleSendMail}
            >
                Continuer
            </button>

            <button
                className="secondary-btn"
                onClick={HandleBackBtn}
            >
                Retour
            </button>
        </div>
    )
}

export default SignUpEmail