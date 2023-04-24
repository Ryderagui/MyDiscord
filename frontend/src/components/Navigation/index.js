import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import LogoutButton from "../LogoutButton";
import UserButton from "../UserButton";
import * as sessionActions from '../../store/session';

function Navigation () {
    const currentUser = useSelector(sessionActions.getUser)
    let links;
    if(currentUser){    
        links = (
            <>
            <UserButton user={currentUser}/>
            <LogoutButton />
            </>
        )
    }else {
        links = (
            <>
            <NavLink to="/login">Log In</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
            </>
        )
    }

    return(
        <ul>
            <li>
            <NavLink to="/">Home</NavLink>
            </li>
            <li>
            {links}
            </li>
        </ul>
    )
};

export default Navigation;