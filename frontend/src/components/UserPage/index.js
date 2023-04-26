import "./UserPage.css"
import Navigation from "../Navigation";
import { useSelector,useDispatch} from "react-redux";
import { useState,useEffect, } from "react";
import * as communityActions from '../../store/community';
import * as sessionActions from '../../store/session';
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
import CommunityList from "../CommunityList";


function UserPage () {
    const dispatch = useDispatch;
    const { userId } = useParams();
    const currentUser = useSelector(sessionActions.getUser);

    if (currentUser === null){
        return <Redirect to={`/`}/>
    }


    return(
        <div className="container">
            <div className="list">
            <h2>Community List</h2>
            <CommunityList/>
            </div>
            <div className="communityShow">
            <h2>Community Show</h2>
            </div>
            <div className="channelArea">
            <Navigation/>
            <h2>Chat Box</h2>
            </div>

        </div>
    )
};

export default UserPage;