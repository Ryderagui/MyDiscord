import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import "./LogoutButton.css"

function LogoutButton () {
    const dispatch = useDispatch();

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    }
    return (
        <button onClick={logout}>Log Out</button>
    )
};

export default LogoutButton;