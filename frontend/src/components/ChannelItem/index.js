import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import * as channelActions from '../../store/channel';
import * as sessionActions from '../../store/session';
import * as communityActions from '../../store/community';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom";
import {BiHash} from "react-icons/bi"
import { BsFillPencilFill } from "react-icons/bs";
import "./ChannelItem.css"
import { useState } from "react";
import ChannelEditForm from "../ChannelEditForm";

function ChannelItem ({channel}) {
    const dispatch = useDispatch();
    const currentUserId = useSelector(sessionActions.getUser);
    const {communityid} = useParams();
    const community = useSelector(communityActions.getCommunity(communityid));
    const history = useHistory();
    const [hover,setHover] = useState(false);
    const [openEditChannel,setOpenEditChannel] = useState(false);

    const handleDeleteChannel = (e) => {
        e.preventDefault();
        return dispatch(channelActions.deleteChannels(communityid,channel.id));
    }
    const handleLink = (e)=>{
        e.preventDefault();
        history.push(`/users/${currentUserId}/${communityid}/${channel.id}`)
    }
    let verify;
    if(community){
        verify = parseInt(currentUserId) === community.userId
    }



    return ( <div className="channelItem" onMouseEnter={()=>{setHover(true)}} onMouseLeave={()=>{setHover(false)}}>
         {openEditChannel && <ChannelEditForm setOpenEditChannel={setOpenEditChannel} channel={channel}/>}
        <div className="channelItemTitle" onClick={()=>{history.push(`/users/${currentUserId}/${communityid}/${channel.id}`)}}>
        <BiHash size={20}/>
        {` ${channel.title}`}
        </div>
        <div className="channelItemIcons" style={{display: (hover && verify) ? "flex" : "none"}}>
        <BsFillPencilFill size={15} onClick={()=>{setOpenEditChannel(true)}} />
        <AiOutlineClose size={20} onClick={handleDeleteChannel}/>
        </div>
        </div>  
    )
};

export default ChannelItem;