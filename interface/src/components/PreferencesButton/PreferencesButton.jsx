import "./PreferencesButton.css";
import { VscSettings } from "react-icons/vsc";
import {useState} from "react";
import PreferencesCard from "../PreferenceCard/PreferencesCard";
import {AnimatePresence, motion} from "motion/react";

function PreferencesButton({selected, setSelected, range, setRange, minAge, setMinAge, maxAge, setMaxAge}) {
    const [showPreferences, setShowPreferences] = useState(false);

    return (
        <div>
            <div id="preferences-btn-div">
                <button id="preferences-btn" onClick={() => setShowPreferences(!showPreferences)} className={showPreferences ? "block" : "hidden"}>
                    <VscSettings/>
                </button>
            </div>
            <AnimatePresence>
                {showPreferences && (
                    <motion.div
                        key="card"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="absolute bottom-0 "
                    >
                        <PreferencesCard showPreferences={showPreferences} setShowPreferences={setShowPreferences} selected={selected} setSelected={setSelected} range={range} setRange={setRange} minAge={minAge} setMinAge={setMinAge} maxAge={maxAge} setMaxAge={setMaxAge}/>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    )
}
export default PreferencesButton;