import React, { useState, useEffect } from 'react';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router";
import { API_BASE_URL } from "../../constants/Constants";
import {toast} from "react-toastify";

const PremiumSubscription = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState("6-months");
    const [isReady, setIsReady] = useState(false);

    const PaypalButtonStyle = {
        layout: 'vertical',
        color: 'gold',
        shape: 'rect',
        label: 'paypal'
    };

    useEffect(() => {
        document.title = "Harmony | Premium";
        setIsReady(true);
    }, []);

    const pricing = {
        "1-month": {
            time: 1,
            price: 29.99,
        },
        "6-months": {
            time: 6,
            price: 89.99,
        },
        "1-year": {
            time: 12,
            price: 149.99,
        }
    };

    const SendSubscription = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/subscription`, {
                method: "POST",
                headers: {
                    Token: localStorage.getItem("token"),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: localStorage.getItem("id"),
                    subscription: pricing[selectedOption].time,
                }),
            });

            if (res.status === 200) {
                const data = await res.json();
                localStorage.setItem("token", data.token);
                toast.success(
                    <>
                        🎉 Félicitations  🎉 <br />
                        Vous êtes maintenant membre Harmony Premium !
                    </>, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                navigate("/profile");
            } else {
                console.error("Failed to send subscription:", await res.text());
            }
        } catch (error) {
            console.error("Error sending subscription:", error);
        }
    };

    return (
        <div className="flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Passez à <br /> Harmony Premium</h1>

            <div className="w-full max-w-lg space-y-4">
                {Object.entries(pricing).map(([key, value]) => (
                    <div
                        key={key}
                        onClick={() => setSelectedOption(key)}
                        className={`relative flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer ${
                            selectedOption === key ? "border-red-500" : "border-gray-600"
                        }`}
                    >
                        <div>
                            <h2 className="text-xl font-medium">{value.time} mois</h2>
                            <p className="text-gray-400">{value.price.toFixed(2)} €</p>
                            {key === "6-months" && <p className="text-green-400">Économisez 20 %</p>}
                            {key === "1-year" && <p className="text-green-400">Économisez 40 %</p>}
                        </div>
                        <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                selectedOption === key ? "border-red-500 bg-red-500" : "border-gray-400"
                            }`}
                        ></div>
                        {key === "6-months" && selectedOption === "6-months" && (
                            <div className="absolute -top-3 -left-3 bg-red-500 text-xs text-white py-1 px-2 rounded-md">
                                Le plus populaire
                            </div>
                        )}
                        {key === "1-year" && selectedOption === "1-year" && (
                            <div className="absolute -top-3 -left-3 bg-red-500 text-xs text-white py-1 px-2 rounded-md">
                                Le moins cher
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="m-auto">
                {isReady && (
                    <PayPalScriptProvider
                        options={{
                            "client-id": "AWQZPo90W58FfDmDe2j-BQdXi31OvwOcbBKriaEjuuJaHB48ofk_5rbwgvUvEXs_ISjV6B8b8TJ9UxH6",
                            currency: "EUR",
                        }}
                    >
                        <PayPalButtons
                            className="mt-16"
                            style={PaypalButtonStyle}
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                value: pricing[selectedOption].price.toFixed(2),
                                            },
                                        },
                                    ],
                                });
                            }}
                            onApprove={SendSubscription}
                        />
                    </PayPalScriptProvider>
                )}
            </div>

            <button
                className="mt-4 text-gray-400 underline"
                onClick={() => {
                    navigate("/profile");
                }}
            >
                Non merci
            </button>
        </div>
    );
};

export default PremiumSubscription;
