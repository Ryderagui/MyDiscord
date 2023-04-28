import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import * as communityActions from '../../store/community';
import * as channelActions from '../../store/channel';
import "./CommunityPage.css"
import { BsFillGearFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import CommunityEditForm from "../CommunityEditForm";
import channelReducer from "../../store/channel";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import ChannelForm from "../ChannelForm";
import ChannelItem from "../ChannelItem";

function CommunityPage () {
    const dispatch = useDispatch();
    const {communityid} = useParams();
    const community = useSelector(communityActions.getCommunity(communityid));
    const [openEdit,setOpenEdit] = useState(false);
    const channel = useSelector(channelActions.getChannels);
    const [openNewChannel,setOpenNewChannel] = useState(false);

    useEffect(()=>{

        dispatch(channelActions.fetchChannels(communityid))

    },[dispatch,communityid])
    const handleDeleteChannel = (e)=> {

    }
    return (
        <div className="communityContainer">
        <div className="communityTitle">
        <h2 className="titleText">{community && community.title}</h2>
        <BsFillGearFill size={30} onClick={()=>{community && setOpenEdit(true)}}/>
        {openEdit && <CommunityEditForm setOpenEdit={setOpenEdit}/>}
        </div>
        <h3 className="textHeader">Text Channels</h3>
        <AiOutlinePlus size={30} onClick={()=>{channel && setOpenNewChannel(true)}}/>
        {openNewChannel && <ChannelForm setOpenNewChannel={setOpenNewChannel}/>}
        <ul>
        {channel.map((chan)=>{
            return <ChannelItem channel={chan} key={chan.id}/>
        })}
        </ul>
        </div>
    )
};

export default CommunityPage;