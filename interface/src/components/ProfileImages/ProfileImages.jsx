import {HiMiniXMark} from "react-icons/hi2";
import React, {useEffect, useState} from "react";
import {API_BASE_URL} from "../../constants/Constants";
import {toast} from "react-toastify";

function ProfileImages ({ setChangeImage, changeImage}) {
    const [images, setImages] = useState(Array(6).fill(null));
    const [files, setFiles] = useState(Array(6).fill(null));
    const [mainIndex, setMainIndex] = useState(0);

    const GetImages = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/images/${localStorage.getItem('id')}`, {
                method: "GET",
                headers: { Token: localStorage.getItem('token') },
            });

            if (res.status === 200) {
                const data = await res.json();

                const fetchedImages = data.body.map(img => img.image_name ? `${API_BASE_URL}/upload/${img.image_name}` : null);

                const paddedImages = [...fetchedImages, ...Array(6 - fetchedImages.length).fill(null)];

                setImages(paddedImages);

                const primaryIndex = data.body.findIndex(img => img.image_primary === 1);
                if (primaryIndex !== -1) {
                    setMainIndex(primaryIndex);
                }
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des images :", error);
        }
    };

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

    const handleDeleteImage = async (index) => {
        const newImages = [...images];
        const newFiles = [...files];
        if (newImages[index]) {
            try {
                await fetch(`${API_BASE_URL}/image/delete`, {
                    method: "DELETE",
                    headers: {
                        Token: localStorage.getItem('token'),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ image_name: newImages[index].split('/').pop() }),
                });
            } catch (error) {
                console.error("Erreur lors de la suppression de l'image :", error);
            }
            URL.revokeObjectURL(newImages[index]);
            newImages[index] = null;
            newFiles[index] = null;
        }
        setImages(newImages);
        setFiles(newFiles);
    };

    const handleSubmitImage = async () => {
        const validImages = images.filter((file) => file !== null);
        if (validImages.length < 2) {
            toast.error("Il vous faut au moins 2 images");
            return;
        }

        try {
            const formData = new FormData();

            files.forEach((file, index) => {
                if (file) {
                    formData.append(`image_${index}`, file);
                }
            });

            formData.append("primaryIndex", mainIndex);

            const res = await fetch(`${API_BASE_URL}/images/upload/${localStorage.getItem('id')}`, {
                method: "POST",
                headers: { Token: localStorage.getItem('token') },
                body: formData,
            });

            if (res.status === 200) {
                setChangeImage(!changeImage)
            } else {
                console.error("Erreur lors de l'envoi des images :", res.statusText);
            }
        } catch (error) {
            console.error("Erreur lors de l'envoi des images :", error);
        }
    };

    useEffect(() => {
        GetImages();
    }, []);

    return(
        <div className="profile-settings-div">
            <button className="profile-btn-close"
                    onClick={() => {
                        const validImages = images.filter((file) => file !== null);
                        if (validImages.length < 2) {
                            toast.error("Il vous faut au moins 2 images");
                        } else {
                            setChangeImage(!changeImage);
                        }
                    }}
            >
                <HiMiniXMark/>
            </button>
            <h2>Mes images</h2>
            <div className="grid grid-cols-3 gap-4 m-auto mt-9">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className="relative w-24 h-36 bg-gray-300 rounded-xl flex items-center justify-center overflow-hidden"
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
                                    accept="image/jpeg, image/png, image/jpg, image/webp"
                                    capture="environment"
                                    className="hidden"
                                    onChange={(e) => handleImageChange(e, index)}
                                />
                            </>
                        )}
                    </div>
                ))}
            </div>

            <button
                className="primary-btn m-auto mt-10"
                onClick={handleSubmitImage}
            >
                Sauvegarder
            </button>
        </div>
    )
}

export default ProfileImages;