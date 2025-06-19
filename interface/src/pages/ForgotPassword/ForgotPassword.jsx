import "./ForgotPassword.css";

function ForgotPassword () {
    return(
        <div className="min-h-screen w-full bg-[url(/src/assets/images/7f6e8a7b-01de-4f4e-92c8-bd83572be6e3.webp)] bg-center bg-cover">
            <div className=" min-h-screen w-full bg-black bg-opacity-40 flex flex-col justify-center items-center">
                <div className="blur-bg w-[88%] h-[380px]" id="blur-bg">
                    <div className="mt-8 flex flex-col  w-[90%] mx-auto text-white">
                        <h2 className="text-2xl">
                            Problèmes de connexion ?
                        </h2>
                        <p className="my-4">
                            Entrez votre adresse e-mail et nous vous enverrons un lien pour récupérer votre compte.
                        </p>
                        <div className="relative max-w-md  h-[56px]">
                            <div className="absolute left-[18px] px-1 h-[1px] w-14 bg-[#7C7C7C] text-sm z-10"></div>
                            <label className="absolute -top-2 left-5 px-1 bg-transparent text-white text-sm z-10">
                                E-mail
                            </label>
                            <input
                                type="email"
                                required
                                className="w-full h-full rounded-[20px] border border-white bg-white bg-opacity-20 px-4 pt-3 text-white placeholder-transparent focus:outline-none "
                            />
                            <button className="primary-btn mt-10">
                                Envoyer un mail
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;