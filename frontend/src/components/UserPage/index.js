import "./UserPage.css"
import Navigation from "../Navigation";
import { useSelector,useDispatch} from "react-redux";
import { useState,useEffect, } from "react";
import * as communityActions from '../../store/community';
import * as sessionActions from '../../store/session';
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
import CommunityList from "../CommunityList";
import CommunityPage from "../CommunityPage";
import UserProfileButton from "../UserProfileButton";
import ChannelPage from "../ChannelPage";


function UserPage () {
    const dispatch = useDispatch;
    const { userid, communityid, channelid } = useParams();
    const currentUser = useSelector(sessionActions.getUser);
    

    if (currentUser === null){
        return <Redirect to={`/`}/>
    }

    

    

    return(
        <div className="container">
            <div className="list">
            <UserProfileButton/>
            <CommunityList/>
            </div>
            <div className="communityShow">
            <CommunityPage />
            </div>
            <div className="channelArea">
            <Navigation channelid={channelid}/>
            <ChannelPage/>
            </div>

        </div>
    )
};

export default UserPage;