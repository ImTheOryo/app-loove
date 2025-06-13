import Slider from "../Slider/Slider";
import DoubleSlider from "../DoubleSlider/DoubleSlider";
import "./PreferencesCard.css";

function PreferencesCard({setShowPreferences, selected, setSelected, range, setRange, minAge, setMinAge, maxAge, setMaxAge}) {

    const options = [
        { value: "girls", label: "Femmes" },
        { value: "boys", label: "Hommes" },
        { value: "both", label: "Tous" },
    ];



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
                    <button className="w-full bg-my-red font-nunito-regular rounded-[15px] text-white p-4 mt-4 mb-7" onClick={() => setShowPreferences(false)}>
                        Fermer
                    </button>
                </section>
            </div>
        </div>
    )
}
export default PreferencesCard;