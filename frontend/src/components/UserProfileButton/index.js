import {FaUserCircle} from "react-icons/fa";
import "./UserProfileButton.css"
import { useState,useEffect } from "react";
import LogoutButton from "../LogoutButton";

function UserProfileButton () {

    const [showUserMenu,setShowUserMenu] = useState(false);
    const openUserMenu = ()=>{
        if (showUserMenu) return;
        setShowUserMenu(true);
    }

    useEffect(()=>{
        if(!showUserMenu) return;
        const closeUserMenu = () => {
            setShowUserMenu(false);
        }

        document.addEventListener('click',closeUserMenu)

        return ()=> {document.removeEventListener('click',closeUserMenu)}

    },[showUserMenu])

    return (
        <div className="userProfile">
        <FaUserCircle size={50} onClick={openUserMenu}/>
        {showUserMenu && (
            <div>
            <LogoutButton/>
            </div>
        )}
        </div>
    )
};

export default UserProfileButton;