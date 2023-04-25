import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import LogoutButton from "../LogoutButton";
import UserButton from "../UserButton";
import * as sessionActions from '../../store/session';
import './Navigation.css';
import {FaDiscord} from "react-icons/fa"

function Navigation () {
    const currentUser = useSelector(sessionActions.getUser)
    let links;
    if(currentUser){    
        links = (
            <>
            <li>
            <UserButton user={currentUser}/>
            </li>
            <li><LogoutButton/></li>
            </>
        )
    }else {
        links = (
            <>
            <li>
            <NavLink to="/login" className="link">Log In</NavLink>
            </li>
            <li>
            <NavLink to="/signup" className="link">Sign Up</NavLink>
            </li>
            </>
            
        )
    }

    return(
        <ul className="navbar">
            <li>
            <NavLink to="/" className="link">
            <div><FaDiscord/></div>
            </NavLink>
            </li>
            {links}
        </ul>
    )
};

export default Navigation;