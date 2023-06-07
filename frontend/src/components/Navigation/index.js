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
  
    return(
        <div className="navbar">
            <div className="navbarLeft">
            <BiHash/>
            {channel && ` ${channel.title}`}
            </div>
            <div className="navbarRight">
                <div id="discoverLink">
                    <NavLink to={`/users/${currentUser}/0`}>
                        Discover 
                    </NavLink>   
                </div>
                <div className="navLogo">
                    <LogoutButton/>
                </div>
            </div>
        </div>
    )
};

export default Navigation;