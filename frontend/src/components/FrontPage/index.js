import { useSelector } from "react-redux";
import React from 'react';
import Navigation from "../Navigation";
import * as sessionActions from '../../store/session';
import { Redirect } from 'react-router-dom';

function FrontPage () {
    const currentUser = useSelector(sessionActions.getUser)
    console.log(currentUser,"currentUser")
    
    if (currentUser){
        return <Redirect to={`/users/${currentUser}`}/>
    }


    return (
        <div className="main-container">
        <Navigation/>
        <h1>Revel</h1>
        </div>
    )

};

export default FrontPage;
