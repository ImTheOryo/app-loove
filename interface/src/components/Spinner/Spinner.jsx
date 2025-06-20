import React from "react";
import { motion } from "motion/react";
import harmonyImage from "../../assets/images/Harmony.webp"

function spinner () {
    return (
        <div className="flex items-center justify-center h-screen bg-white">
            <motion.div
                className="relative"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
            >
                <div
                    className="w-40 h-40 rounded-full bg-gradient-to-r from-pink-300 via-purple-300 to-yellow-300 flex items-center justify-center shadow-xl shadow-pink-200"
                >
                    <div className="absolute w-48 h-48 rounded-full bg-pink-200 opacity-40 animate-pulse"></div>
                    <img
                        src={harmonyImage}
                        alt="Heart and Music Logo"
                        className="w-36 h-36 z-10 drop-shadow-md"
                    />
                </div>
            </motion.div>
        </div>
    )
}


export default spinner;