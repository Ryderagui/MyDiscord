import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import LogoutButton from "../LogoutButton";
import * as sessionActions from '../../store/session';
import './Navigation.css';
import {FaDiscord} from "react-icons/fa"

function Navigation () {
    const currentUser = useSelector(sessionActions.getUser)
    let links;
    if(currentUser){    
        links = (
            <>
            <li><LogoutButton/></li>
            </>
        )
    }else {
        links = (
            <>
            <li>
            <NavLink to="/login" className="link">
            <button class="button2" >Log In</button>
            </NavLink>
            </li>
            <li>
            <NavLink to="/signup" className="link">
            <button class="button2" >Sign Up</button>
            </NavLink>
            </li>
            </>
            
        )
    }

    return(
        <ul className="navbar">
            <li>
            <NavLink to="/" className="logo">
            <div><FaDiscord size={25}/></div>
            </NavLink>
            </li>
            {links}
        </ul>
    )
};

export default Navigation;