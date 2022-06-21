import { useRef } from "react";
import { Link, NavLink } from "react-router-dom";

//components
import AccountNav from "./AccountNav";
import { FaHamburger } from "react-icons/fa";
import { AiOutlineCloseSquare, AiOutlineClose } from "react-icons/ai"

// logo
import logo from "../../assets/logo/logo_color.svg";

// styles
import "../../styles/header/header.css";

const Header = () => {
    const navMenu = useRef();


    const openMenu = () => {
        navMenu.current.classList.add('menu-open');
    };

    const closeMenu = () => {
        navMenu.current.classList.remove('menu-open');
    };

    return (
        <header id="header">
            <div className="header-content-wrapper">
                <Link to="/" activeClassName="active">
                    <img src={logo} alt="LOGO" className="logo" />
                </Link>
                <div className="header-nav-acc_list-wrapper" ref={navMenu} >

                    <AiOutlineClose className="close-menu-btn" onClick={closeMenu} />
                    <nav>

                        <ul className="nav-list">
                            
                            <li>
                                <NavLink
                                    to="/recipes/breakfast"
                                    className="type-list-item"
                                    activeclasscame="active"
                                    onClick={closeMenu}
                                >
                                    breakfast
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/recipes/brunch"
                                    className="type-list-item"
                                    activeclassname="active"
                                    onClick={closeMenu}
                                >
                                    brunch
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/recipes/lunch"
                                    className="type-list-item"
                                    activeclassname="active"
                                    onClick={closeMenu}
                                >
                                    lunch
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/recipes/dinner"
                                    className="type-list-item"
                                    activeclassname="active"
                                    onClick={closeMenu}
                                >
                                    dinner
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                    <AccountNav closeMenu={closeMenu} />
                </div>
                <FaHamburger className="hamburger-btn" onClick={openMenu} />
            </div>
        </header>
    );
};

export default Header;
