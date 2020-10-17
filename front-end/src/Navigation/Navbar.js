import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import { Image } from 'react-bootstrap';
import './Navbar.css';
import { IconContext } from 'react-icons';


function Navbar(props){
    const [sidebar, setSidebar] = useState(false)
    const showSidebar = () => setSidebar(!sidebar)
    return (
        <div className="myMenu">
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className="navbar">
                    <Link to={"#"} className="menu-bars">
                        <FontAwesomeIcon icon={faBars} onClick={showSidebar} />
                    </Link>
                    <Link to={"/"} className="menu-bars">
                        <Image className="logo" src="/Images/logo.png" />
                    </Link>
                </div>
            

                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSidebar}>
                        <li className="navbar-toggle">
                            <Link to='#' className='menu-bars'>
                                <FontAwesomeIcon icon={faTimes} />
                            </Link>
                        </li>
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}


                    </ul>
                </nav>

            </IconContext.Provider>

        </div>
    );
}

export default Navbar;