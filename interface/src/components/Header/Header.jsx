import LogoWhite from "../../assets/images/LogoWhite.webp";
import { RxHamburgerMenu } from "react-icons/rx";
import {Link} from "react-router";
import "./Header.css"

function Header() {
    return (
       <div>
           <nav className="fixed top-0 flex justify-between items-center w-full" id="header-mobile">
               <Link to="/">
                   <img src={LogoWhite} alt="" className="w-[125px]"/>
               </Link>
           </nav>

           <nav className="fixed top-0 flex justify-between items-center w-full" id="header-desktop">
               <Link to="/" className="flex items-center">
                   <img src={LogoWhite} alt="" className="w-[130px]"/>
                   <p className="text-white text-4xl font-quicksand-bold font-bold">
                       Harmony
                   </p>
               </Link>
           </nav>
       </div>

    )
}
export default Header;