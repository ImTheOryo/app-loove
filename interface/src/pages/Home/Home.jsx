import {Link} from "react-router";
import "./Home.css"

function Home () {

    document.title = "Harmony | Accueil";

    return (
        <div className="min-h-screen w-full bg-[url(/src/assets/images/7f6e8a7b-01de-4f4e-92c8-bd83572be6e3.webp)] bg-center bg-cover">
            <div className=" min-h-screen w-full bg-black bg-opacity-40">
                <div className={ "flex flex-col justify-center items-center"}>
                        <span style={{fontFamily:"Poppins-Bold, sans-serif"}} className="text-2xl text-center items-center text-white mx-auto mt-52" id="catch-prase">
                            Love is just a beat away™
                        </span>
                    <div className="w-[80%]">
                        <Link to="/inscription" className="primary-btn mt-56">Créer un compte</Link>
                        <Link to="/connexion" className="secondary-btn mt-[21px] ">Connexion</Link>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default Home;
