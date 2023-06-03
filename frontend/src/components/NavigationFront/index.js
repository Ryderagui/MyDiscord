import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import LogoutButton from "../LogoutButton";
import * as sessionActions from '../../store/session';
import * as channelActions from '../../store/channel';
import './NavigationFront.css';
import {FaDiscord, FaGithub, FaLinkedin} from "react-icons/fa";
import { BiHash} from "react-icons/bi";


function NavigationFront ({channelid}) {
    const currentUser = useSelector(sessionActions.getUser);
    const channel = useSelector(channelActions.getChannel(channelid));
    let links;
    if(currentUser){    
        links = (
            <>
            <li className="navLogout"><LogoutButton/></li>
            <li className="navUserPage"><NavLink to={`/users/${currentUser}`}>Open Revel</NavLink></li>
            </>
        )
    }else {
        links = (
            <div className="loginButtons">
            <NavLink to="/login" className="link">
            <button className="button2" >Log In</button>
            </NavLink>
            <NavLink to="/signup" className="link">
            <button className="button2" >Sign Up</button>
            </NavLink>
            </div>
            
        )
    }

    return(
        <div className="navbarFront">
            <div className="navbarFrontLeft">
                <div className="navFrontLogo">
                <NavLink to="/" className="logo">
                    <div>
                        <FaDiscord size={40} color={"white"}/> 
                    </div>
                </NavLink>
                </div>
                <h2 className="navFrontTitle">Revel</h2>
            </div>
            <div className="navFrontMiddle">
                <div className="navFrontLogo">
                    <FaGithub size={35} color={"white"}></FaGithub>
                </div>
                <div className="navFrontLogo"> 
                    <FaLinkedin size={35} color={"white"}></FaLinkedin>
                </div>
            </div>
            <div className="navbarFrontRight">
            {links}
            </div>
        </div>
    )
};

export default NavigationFront;