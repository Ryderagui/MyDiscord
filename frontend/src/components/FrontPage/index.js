import { useSelector } from "react-redux";
import React from 'react';
import NavigationFront from "../NavigationFront";
import * as sessionActions from '../../store/session';
import { Redirect } from 'react-router-dom';
import "./FrontPage.css"
function FrontPage () {
    const currentUser = useSelector(sessionActions.getUser)
    console.log(currentUser,"currentUser")
    
    if (currentUser){
        return <Redirect to={`/users/${currentUser}`}/>
    }


    return (
        <div className="main-container">
        <NavigationFront/>
        <div className="contentArea">
        <div className="largeText">IMAGINE A PLACE...</div>
        <div className="paragraph">...where you can belong to a school club, a gaming group or a worldwide art community.
            Where just you and a handful of friends can spend time together. A place that make it 
            easy to talk everyday and hang out more often. 
        </div>
        </div>
        </div>
    )

};

export default FrontPage;
