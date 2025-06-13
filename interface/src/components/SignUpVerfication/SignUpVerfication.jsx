import "./SignUpVerfication.css";
import {useState} from "react";
import {API_BASE_URL} from "../../constants/Constants";
import {toast} from "react-toastify";

function SignUpVerification ({email, setStepVerification, setStepPassword}) {
    const [code, setCode] = useState(["", "", "", ""]);

    const CheckCode = async (currentCode) => {
        const data = {
            email: email,
            code: currentCode,
        }

        setCode(["", "", "", ""]);

        const res = await fetch(`${API_BASE_URL}/register/verify`, {
            method: "POST",
            body: JSON.stringify(data)
        })

        if (res.status === 204) {
            toast.error("Code invalide");
        } else if (res.status === 200) {
            setStepVerification(false);
            setStepPassword(true)
        }
    }

    if (code.every(item => item.trim() !== "")) {
        const currenCode = code.join("");
        CheckCode(currenCode);
    }

    const handleInput = (num) => {
        const index = code.findIndex((digit) => digit === "");
        if (index === -1) return;
        const newCode = [...code];
        newCode[index] = num;
        setCode(newCode);
    };


    const handleDelete = () => {
        const index = code.findLastIndex((digit) => digit !== "");
        if (index === -1) return;
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
    };

    const handleResend = () => {
        setCode(["", "", "", ""]);
        // Implémenter la logique d'envoi ici
    };

    const keypad = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        ["", 0, "←"],
    ];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center p-4">
            <h2 className="text-lg font-medium mb-6 text-gray-700">
                Entrez le code que <br/>nous vous avons envoyé
            </h2>

            <div className="flex gap-3 mb-8">
                {code.map((digit, idx) => (
                    <div
                        key={idx}
                        className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold border-2 
                        ${digit ? 'bg-rose-500 text-white border-rose-500' : 'border-rose-300 text-rose-400'}`}
                    >
                        {digit}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
                {keypad.flat().map((key, idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                            if (key === "←") handleDelete();
                            else if (key !== "") handleInput(String(key));
                        }}
                        className="w-16 h-16 text-xl font-semibold rounded-full flex items-center justify-center hover:bg-gray-100"
                    >
                        {key}
                    </button>
                ))}
            </div>

            <button
                onClick={handleResend}
                className="text-rose-500 font-semibold text-sm"
            >
                Send again
            </button>
        </div>
    )
}

export default SignUpVerification;