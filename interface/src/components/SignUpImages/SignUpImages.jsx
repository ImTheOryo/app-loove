import React, { useState } from "react";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../constants/Constants";

function SignUpImages({email, setCurrentStep, setNextStep}) {
    const [images, setImages] = useState(Array(6).fill(null));
    const [files, setFiles] = useState(Array(6).fill(null));
    const [mainIndex, setMainIndex] = useState(0);

    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (!file) return;

        const newImages = [...images];
        const newFiles = [...files];
        newImages[index] = URL.createObjectURL(file);
        newFiles[index] = file;
        setImages(newImages);
        setFiles(newFiles);
    };

    const handleDeleteImage = (index) => {
        const newImages = [...images];
        const newFiles = [...files];
        if (newImages[index]) {
            URL.revokeObjectURL(newImages[index]);
            newImages[index] = null;
            newFiles[index] = null;
        }
        setImages(newImages);
        setFiles(newFiles);
    };

    const handleSubmitImage = async () => {
        const validFiles = files.filter((file) => file !== null);
        if (validFiles.length < 2) {
            toast.error("Il vous faut au moins 2 images");
            return;
        }

        const formData = new FormData();
        validFiles.forEach((file, index) => {
            formData.append(`image_${index}`, file);
        });
        formData.append("primaryIndex", mainIndex);
        formData.append("email", email);

        try {
            await fetch(`${API_BASE_URL}/register/images`, {
                method: "POST",
                body: formData,
            });
            setCurrentStep(false);
            setNextStep(true);

        } catch (error) {
            toast.error("Échec de l'envoi des images");
        }
    };

    return (
        <div className="flex flex-col gap-6 pt-28 w-[80%] m-auto">
            <h2 className="text-2xl font-semibold text-black">Ajoute tes photos</h2>

            <div className="grid grid-cols-3 gap-4 m-auto">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className="relative w-24 h-36 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden"
                    >
                        {index === mainIndex && (
                            <span className="absolute top-1 left-1 text-xs bg-white text-red-500 border border-red-500 px-2 py-0.5 rounded-full">
                                Principale
                            </span>
                        )}

                        {img ? (
                            <>
                                <img
                                    src={img}
                                    alt={`uploaded ${index}`}
                                    className="object-cover w-full h-full cursor-pointer"
                                    onClick={() => setMainIndex(index)}
                                />
                                <button
                                    className="absolute bottom-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs"
                                    onClick={() => handleDeleteImage(index)}
                                >
                                    Supprimer
                                </button>
                            </>
                        ) : (
                            <>
                                <label
                                    htmlFor={`photo-input-${index}`}
                                    className="cursor-pointer w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-300"
                                >
                                    <span className="text-red-500 text-2xl">+</span>
                                </label>
                                <input
                                    id={`photo-input-${index}`}
                                    type="file"
                                    accept="image/jpeg, image/png, image/jpg"
                                    className="hidden"
                                    onChange={(e) => handleImageChange(e, index)}
                                />
                            </>
                        )}
                    </div>
                ))}
            </div>

            <button
                className="primary-btn m-auto"
                onClick={handleSubmitImage}
            >
                Continuer
            </button>
        </div>
    );
}

export default SignUpImages;
