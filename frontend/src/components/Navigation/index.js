import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import LogoutButton from "../LogoutButton";
import * as sessionActions from '../../store/session';
import * as channelActions from '../../store/channel';
import './Navigation.css';
import {FaDiscord} from "react-icons/fa";
import { BiHash} from "react-icons/bi";


function Navigation ({channelid}) {
    const currentUser = useSelector(sessionActions.getUser);
    const channel = useSelector(channelActions.getChannel(channelid));
    let links;
    if(currentUser){    
        links = (
            <>
            <li className="navLogout"><LogoutButton/></li>
            </>
        )
    }else {
        links = (
            <div>
            <NavLink to="/login" className="link">
            <button class="button2" >Log In</button>
            </NavLink>
            <NavLink to="/signup" className="link">
            <button class="button2" >Sign Up</button>
            </NavLink>
            </div>
            
        )
    }

    return(
        <div className="navbar">
            <div className="navbarLeft">
            <BiHash/>
            {channel && ` ${channel.title}`}
            </div>
            <div className="navbarRight">
            <div className="navLogo">
            <NavLink to="/" className="logo">
            <div><FaDiscord size={25} color={"grey"}/></div>
            </NavLink>
            </div>
            {links}
            </div>
        </div>
    )
};

export default Navigation;