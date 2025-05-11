import "./Navbar.css";
import {Link} from "react-router";
import { GoHome } from "react-icons/go";
import { FiCompass } from "react-icons/fi";
import { PiChatTeardropText } from "react-icons/pi";
import { MdPersonOutline } from "react-icons/md";
import { PiGear } from "react-icons/pi";

function Navbar () {
    return (
        <div>
            <div id="user-navbar">
                <Link to="/decouvertes" id="navbar-grid-1" className="selected-navbar">
                    <GoHome className="text-[24px] "/>
                </Link>

                <Link to="/" id="navbar-grid-2" className="">
                    <FiCompass className="text-[24px]"/>
                </Link>

                <Link to="/" id="navbar-grid-3" className="">
                    <PiChatTeardropText className="text-[24px]"/>
                </Link>

                <Link to="/" id="navbar-grid-4" className="">
                    <MdPersonOutline className="text-[24px]"/>
                </Link>

                <Link to="/" id="navbar-grid-5" className="">
                    <PiGear className="text-[24px]"/>
                </Link>
            </div>
        </div>
    );
}

export default Navbar;