import "./SignUpChoice.css";
import { FaCheck } from "react-icons/fa6";
import {useState} from "react";
import {toast} from "react-toastify";
import {API_BASE_URL} from "../../constants/Constants";

function SignUpChoice ({email, title, name, table, error, setCurrentStep, setNextStep }) {
    const [checked, setChecked] = useState(null);

    const HandleSetGender = async () => {
        if (!checked) {
            toast.error(error)
        } else {


            await fetch( `${API_BASE_URL}/register/${name}`, {
                method: "POST",
                body: JSON.stringify( {
                    item: checked,
                    mail: email,
                }),
            });

            setCurrentStep(false);
            setNextStep(true);
        }
    }

    return (
        <div className="pt-28 what-am-i-sign-up">
            <h2>
                {title}
            </h2>

            <div>
                {
                    table.map((item, index) => (
                        <label className={`label-input ${checked == index + 1 ? "input-selected" : ""}`}>
                            <input
                                type="radio"
                                name={name}
                                value={index + 1}
                                required
                                onChange={(e) => {
                                    setChecked(e.target.value);
                                }}
                            />
                            {item}

                            <FaCheck className={`text-right self-center ${checked == index + 1? "text-white" : "text-gray-400"}`} />
                        </label>
                    ))
                }
            </div>

            <button
                className="primary-btn mt-16"
                onClick={HandleSetGender}
            >
                Continuer
            </button>
        </div>
    )
}

export default SignUpChoice;