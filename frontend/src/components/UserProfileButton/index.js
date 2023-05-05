import {FaUserCircle} from "react-icons/fa";
import "./UserProfileButton.css"
import { useState,useEffect } from "react";
import LogoutButton from "../LogoutButton";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../store/session';
import * as userActions from '../../store/user'


function UserProfileButton () {
    const dispatch = useDispatch();
    const currentUserId = useSelector(sessionActions.getUser);
    const [res,setRes] = useState(0);
    const user = useSelector(userActions.getUser)
    useEffect(()=>{
        setRes(dispatch(userActions.fetchUser(currentUserId)))
    },[dispatch,currentUserId])

    return (
        <div className="userProfile">
        <div className="userLogo">
        <FaUserCircle size={50}/>
        </div>
        <div>
        {user && `${user.username}`}
        </div>
        </div>
    )
};

export default UserProfileButton;