import "./LookingForUserCard.css";
import { GiLovers, GiMusicalNotes, GiThreeFriends } from "react-icons/gi";
import { SiFireship } from "react-icons/si";


function LookingForUserCard({LookingFor}) {
    const LOOKING_FOR_MAP = {
        1: {
            text: "No lyrics, just vibes",
            icon: <SiFireship className="mr-2 text-2xl text-red-500"/>,
            backgroundColor: "bg-red-50",
            textColor: "text-red-600",
            shadowColor: "rgba(235,32,32,0.58)",
        },
        2: {
            text: "Feel first, define later’",
            icon: <GiMusicalNotes className="mr-2 text-2xl text-orange-500"/>,
            backgroundColor: "bg-transparent",
            textColor: "text-orange-600",
            shadowColor: "rgba(249, 115, 22, 0.56)",
        },
        3: {
            text: "Find someone to feat",
            icon: <GiThreeFriends className="mr-2 text-2xl text-blue-500"/>,
            backgroundColor: "bg-blue-50",
            textColor: "text-blue-600",
            shadowColor: "rgba(59, 130, 246, 0.56)",
        },
        4: {
            text: "Perfect Harmony",
            icon: <GiLovers className="mr-2 text-2xl text-pink-500"/>,
            backgroundColor: "bg-pink-50",
            textColor: "text-pink-600",
            shadowColor: "rgba(243, 129, 185, 0.56)",
        }
    }

    const data = LOOKING_FOR_MAP[LookingFor];

    return (
        <div className={`w-[90%] m-auto flex items-center justify-center px-3 py-1 rounded-full text-sm font-medium `} style={{boxShadow: `0px 0px 17px 2px ${data.shadowColor}`}}>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl shadow-[0_0_25px_${data.shadowColor}] ${data.textColor} font-semibold text-md`}>
                {data.icon}
                {data.text}
            </div>
        </div>
    )
}

export default LookingForUserCard;