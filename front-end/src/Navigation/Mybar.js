import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import './Navbar.css';
import { IconContext } from 'react-icons';


function Mybar(props){
    const [sidebar, setSidebar] = useState(false)
    const showSidebar = () => setSidebar(!sidebar)
  
    return (
        <div className="myMenu">
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className="navbar">
                    <Link to={"#"} className="menu-bars">
                        <Image className="logo" src="/Images/logo.png" />
                    </Link>
                </div>
            </IconContext.Provider>

        </div>
    );
}

export default Mybar;