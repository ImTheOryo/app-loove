import {ToastContainer, toast} from "react-toastify";
import {Link, useNavigate} from "react-router";
import {login} from "../../services/AuthService";

function Login () {
    const navigate = useNavigate();
    const place = "tableau-de-bord";
    const handle_submit = async (event) => {
        const form = document.getElementById("login-form");
        event.preventDefault();
        if (!form.checkValidity()){
            form.reportValidity();
        }
        let res = await login(form);
        if (res.status === 401) {
            toast.error("Mail ou mot de passe incorrect");
        } else if (res.status === 200) {
            res = await res.json();
            localStorage.clear();
            localStorage.setItem("id", res.body[1].id);
            localStorage.setItem("token", res.token);
            res.body[0].status === "admin" ? navigate(`/administrateur/${place}`) : navigate("/");
        }
    }

    return (
        <div className="min-h-screen w-full bg-[url(/src/assets/images/7f6e8a7b-01de-4f4e-92c8-bd83572be6e3.webp)] bg-center bg-cover">
            <div className=" min-h-screen w-full bg-black bg-opacity-40 flex flex-col justify-center items-center">
                <div className="blur-bg w-[88%] h-[380px] ">
                    <form id="login-form">

                        <div className="mt-16 flex flex-col">
                            <div className="relative w-[90%] max-w-md mx-auto h-[56px]">
                                <div className="absolute left-[18px] px-1 h-[1px] w-14 bg-[#7C7C7C] text-sm z-10"></div>
                                <label className="absolute -top-2 left-5 px-1 bg-transparent text-white text-sm z-10">
                                    E-mail
                                </label>
                                <input type="email" required className="w-full h-full rounded-[20px] border border-white bg-white bg-opacity-20 px-4 pt-3 text-white placeholder-transparent focus:outline-none " name="mail" id="mail"/>
                            </div>

                            <div className="relative w-[90%] max-w-md mx-auto h-[56px] mt-10">
                                <div className="absolute left-[18px] px-1 h-[1px] w-24 bg-[#B5B5B5] text-sm z-10"></div>
                                <label className="absolute -top-2 left-5 px-1 bg-transparent text-white text-sm z-10">
                                    Mot de passe
                                </label>
                                <input type="password" required className="w-full h-full rounded-[20px] border border-white bg-white bg-opacity-20 px-4 pt-3 text-white placeholder-transparent focus:outline-none" name="password" id="password"/>
                                <Link to="#" className="absolute bottom-[-20px] right-3 text-xs text-white hover:underline">
                                    Mot de passe oublié
                                </Link>
                            </div>
                            <button className="primary-btn m-auto mt-14" onClick={handle_submit}>
                                Connexion
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Login;