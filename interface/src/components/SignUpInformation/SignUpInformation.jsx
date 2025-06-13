import "./SignUpInformation.css";
import {useState} from "react";
import {toast} from "react-toastify";
import {API_BASE_URL} from "../../constants/Constants";

function SignUpInformation ({email,setStepInformation, setWhatAmI}) {
    const [firstName, setFirstName] = useState("");
    const [ddn, setDDN] = useState("");
    const [current, setCurrent] = useState("");
    const today = new Date();
    const todayFormatted = today.toISOString().split('T')[0];
    const hundredYearsAgo = new Date();
    hundredYearsAgo.setFullYear(today.getFullYear() - 100);
    const hundredYearsAgoFormatted = hundredYearsAgo.toISOString().split('T')[0];

    const calculateAge = (dateString) => {
        const today = new Date();
        const birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

   const HandleSendInfos = async (e) => {
       const form = document.getElementById("form-infos");
       if (!form.checkValidity()) {
           form.reportValidity();
       } else {
           e.preventDefault();
           const isOver18 = calculateAge(ddn);

           if (isOver18 < 18) {
               toast.error("Vous n'avez pas l'age requis")
           } else {
               await fetch(`${API_BASE_URL}/register/infos`, {
                   method: 'POST',
                   body: JSON.stringify({
                       email: email,
                       firstName: firstName,
                       age: isOver18,
                       ddn: ddn,
                       current: current,
                   }),
               });
               setWhatAmI(true);
               setStepInformation(false);
           }
       }
   }

    return (
        <div className="sign-up-info pt-28">
            <h2>
                Tes informations
            </h2>

            <form action="#" id="form-infos">
                <div className="relative w-[90%] max-w-md mx-auto h-[56px] mt-10">
                    <div className="absolute left-[18px] px-1 h-[1px] w-[63px] bg-white text-sm z-10"></div>
                    <label className="absolute -top-2 left-5 px-1 bg-transparent text-gray-500 text-sm z-10">
                        Prénom
                    </label>
                    <input
                        type="text"
                        required
                        className="w-full h-full rounded-[20px] border border-gray-300 bg-white bg-opacity-20 px-4 pt-3  placeholder-transparent focus:outline-none"
                        name="first-name"
                        id="first-name"
                        onChange={(e)=>setFirstName(e.target.value)}
                    />
                </div>
                <div className="relative w-[90%] max-w-md mx-auto h-[56px] mt-10">
                    <div className="absolute left-[18px] px-1 h-[1px] w-[128px] bg-white text-sm z-10"></div>
                    <label className="absolute -top-2 left-5 px-1 bg-transparent text-gray-500 text-sm z-10">
                        Date de naissance
                    </label>
                    <input
                        type="date"
                        required
                        className="w-full h-full rounded-[20px] border border-gray-300 bg-white bg-opacity-20 px-4 pt-3  placeholder-transparent focus:outline-none"
                        name="ddn"
                        id="ddn"
                        max={todayFormatted}
                        min={hundredYearsAgoFormatted}
                        onChange={(e)=>setDDN(e.target.value)}
                    />
                </div>

                <div className="relative w-[90%] max-w-md mx-auto h-[56px] mt-10">
                    <div className="absolute left-[18px] px-1 h-[1px] w-[90px] bg-white text-sm z-10"></div>
                    <label className="absolute -top-2 left-5 px-1 bg-transparent text-gray-500 text-sm z-10">
                        Mon activité
                    </label>
                    <input
                        type="text"
                        required
                        className="w-full h-full rounded-[20px] border border-gray-300 bg-white bg-opacity-20 px-4 pt-3 focus:outline-none"
                        name="current"
                        id="current"
                        placeholder={"Ex : Étudiant"}
                        maxLength={32}
                        onChange={(e)=>setCurrent(e.target.value)}
                    />
                </div>

                <button className="primary-btn mt-14" onClick={HandleSendInfos}>
                    Continuer
                </button>
            </form>

        </div>
    )
}

export default SignUpInformation;