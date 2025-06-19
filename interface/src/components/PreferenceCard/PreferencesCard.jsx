import Slider from "../Slider/Slider";
import DoubleSlider from "../DoubleSlider/DoubleSlider";
import "./PreferencesCard.css";
import {API_BASE_URL} from "../../constants/Constants";

function PreferencesCard({setShowPreferences, selected, setSelected, range, setRange, minAge, setMinAge, maxAge, setMaxAge}) {

    const options = [
        { value: 2, label: "Femmes" },
        { value: 1, label: "Hommes" },
        { value: 3, label: "Tous" },
    ];

    const SendChangeFilter = async () => {
        try {
            await fetch(`${API_BASE_URL}/filter/${localStorage.getItem("id")}`, {
                method: "PATCH",
                headers: {Token: localStorage.getItem("token")},
                body: JSON.stringify({
                    minAge: minAge,
                    maxAge: maxAge,
                    wannaSeeId: selected,
                    range: range
                })
            });
        } catch (e) {
            console.error("Une erreur est survenue lors de l'envoie des filtres :", e);
        }
    }


    return (
        <div id="preferences-dropdown">
            <div id="preferences-dropdown-content">
                <h2 id="preferences-dropdown-title">
                    Filtres
                </h2>
                <section id="preferences-dropdown-section">
                    <article>
                        <h3>
                            Je veux voir
                        </h3>
                        <div id="interested-in-radio">
                            {options.map((option) => (
                                <label
                                    key={option.value}
                                    className={`w-[33%] text-center py-5 rounded-md cursor-pointer
                                        ${selected === option.value ? " bg-rose-500 text-white font-bold" : "bg-white text-gray-700 hover:bg-gray-100"}
                                        `}
                                >
                                    <input
                                        type="radio"
                                        name="gender"
                                        value={option.value}
                                        checked={selected === option.value}
                                        onChange={() => setSelected(option.value)}
                                        className="sr-only"
                                    />
                                    {option.label}
                                </label>
                            ))}
                        </div>
                    </article>
                    <article>
                        <div id="preferences-dropdown-section-distance">
                            <h3>
                                Distance
                            </h3>
                            <p>
                                {range}km
                            </p>
                        </div>
                        <Slider range={range} setRange={setRange} />
                    </article>
                    <article>
                        <div id="preferences-dropdown-section-distance">
                            <h3>
                                Age
                            </h3>
                            <p>
                                {minAge}-{maxAge}
                            </p>
                        </div>
                        <DoubleSlider minVal={minAge} setMinVal={setMinAge} maxVal={maxAge} setMaxVal={setMaxAge} />
                    </article>
                    <button className="w-full bg-my-red font-nunito-regular rounded-[15px] text-white p-4 mt-4 mb-7" onClick={() => {
                        SendChangeFilter()
                        setShowPreferences(false)
                    }}>
                        Fermer
                    </button>
                </section>
            </div>
        </div>
    )
}
export default PreferencesCard;