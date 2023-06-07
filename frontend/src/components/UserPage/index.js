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
import { FaDiscord } from "react-icons/fa";
import CommunityIndex from "../CommunityIndex";

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
            <div className="topDiscordLogo">
            <FaDiscord size={50}/>
            </div>
            <CommunityList/>
            </div>
            <div className="communityShow">
            <CommunityPage />
            <UserProfileButton/>
            </div>
            <div className="channelArea">
            <Navigation channelid={channelid}/>
            {channelid ? <ChannelPage/> : <CommunityIndex/>}
            </div>

        </div>
    )
};

export default UserPage;