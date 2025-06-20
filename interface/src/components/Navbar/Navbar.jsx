import "./Navbar.css";
import {Link, useLocation} from "react-router";
import { GoHome } from "react-icons/go";
import { CiHeart } from "react-icons/ci";
import { PiChatTeardropText, PiGear } from "react-icons/pi";
import { MdPersonOutline } from "react-icons/md";


function Navbar () {
    const location = useLocation();
    const currentPath = location.pathname;
    return (
        <div>
            <div id="user-navbar">
                <Link to="/decouvertes" id="navbar-grid-1" className={currentPath === "/decouvertes" ? "navbar-selected" : ""}>
                    <GoHome className="text-[24px] "/>
                </Link>

                <Link to="/likes" id="navbar-grid-2" className={currentPath === "/likes" ? "navbar-selected" : ""}>
                    <CiHeart className="text-[24px]"/>
                </Link>

                <Link to="/conversations" id="navbar-grid-3" className={currentPath === "/conversations" ? "navbar-selected" : ""}>
                    <PiChatTeardropText className="text-[24px]"/>
                </Link>

                <Link to="/profile" id="navbar-grid-4" className={currentPath === "/profile" ? "navbar-selected" : ""}>
                    <MdPersonOutline className="text-[24px]"/>
                </Link>

                <Link to="/parametres" id="navbar-grid-5" className={currentPath === "/parametres" ? "navbar-selected" : ""}>
                    <PiGear className="text-[24px]"/>
                </Link>
            </div>
        </div>
    );
}

export default Navbar;