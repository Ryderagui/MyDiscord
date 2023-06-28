import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import LogoutButton from "../LogoutButton";
import * as sessionActions from '../../store/session';
import * as channelActions from '../../store/channel';
import './Navigation.css';
import { BiHash} from "react-icons/bi";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import {FaGithub, FaLinkedin} from "react-icons/fa";
function Navigation ({channelid}) {
    const currentUser = useSelector(sessionActions.getUser);
    const channel = useSelector(channelActions.getChannel(channelid));
    const history = useHistory();
    const currentUserId = useSelector(sessionActions.getUser)

    const handleLink = (e)=>{
        e.preventDefault();
        history.push(`/users/${currentUserId}/0`)
    }
  
    return(
        <div className="navbar">
            <div className="navbarLeft">
                <div className="navHashWrapper">
                    <BiHash className="iconNav"/>
                </div>
                <div className="navChannelTitle">
                    {channel && ` ${channel.title}`}
                </div>
                </div>
            <div className="navbarRight">
                <div className="discoverButtonWrapper">
                    <div id="discoverLink" style={{display:"flex"}} onClick={handleLink}>
                        Discover                            
                    </div>
                </div>
                <div className="navLogo">
                    <a href="https://github.com/Ryderagui">
                        <FaGithub className="iconNav" ></FaGithub>
                    </a>
                </div>
                <div className="navLogo"> 
                <a href="https://www.linkedin.com/in/raguilera994/">
                    <FaLinkedin className="iconNav"></FaLinkedin>
                </a>
                </div>

                <div className="navLogo">
                    <LogoutButton/>
                </div>
            </div>
        </div>
    )
};

export default Navigation;