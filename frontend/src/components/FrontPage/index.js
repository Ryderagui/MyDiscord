import { useSelector } from "react-redux";
import React from 'react';
import NavigationFront from "../NavigationFront";
import * as sessionActions from '../../store/session';
import { Redirect } from 'react-router-dom';
import leftImage from "../../assets/splashbackground2.svg";
import rightImage from "../../assets/splashbackground3.svg"
import "./FrontPage.css"
function FrontPage () {
    const currentUser = useSelector(sessionActions.getUser)
    
    if (currentUser){
        return <Redirect to={`/users/${currentUser}`}/>
    }


    return (
        <div className="main-container">
           <div className="topHalf">
                <div className="navFront"><NavigationFront/></div>
                <div className="contentArea">
                    <div className="largeText">IMAGINE A PLACE...</div>
                    <div className="paragraph">...where you can belong to a school club, a gaming group or a worldwide art community.
                    Where just you and a handful of friends can spend time together. A place that make it 
                    easy to talk everyday and hang out more often. 
                    </div>
                </div>
                <div className="imageArea">
                    <img className="frontLeftImage" src={leftImage}/>
                    <img className="frontRightImage"  src={rightImage}/>
                </div>
            </div>
            <div className="bottomHalf">
                    <div className="contentArea">
                        <div className="largeText">IMAGINE A PLACE...</div>
                        <div className="paragraph">...where you can belong to a school club, a gaming group or a worldwide art community.
                        Where just you and a handful of friends can spend time together. A place that make it 
                        easy to talk everyday and hang out more often. 
                    </div>
                </div>
            </div>
        </div>
    )

};

export default FrontPage;
