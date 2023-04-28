import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import * as communityActions from '../../store/community';
import * as channelActions from '../../store/channel';
import * as sessionActions from '../../store/session';
import { useState, useEffect } from "react";
import "./ChannelPage.css"

function ChannelPage () {
    const dispatch = useDispatch();
    const currentUserId = useSelector(sessionActions.getUser)
    const {channelid} = useParams();
    const channel = useSelector(channelActions.getChannel(channelid));
    return(
        <div>
        <h2>{channel && channel.title}</h2>
        </div>
    )
};

export default ChannelPage