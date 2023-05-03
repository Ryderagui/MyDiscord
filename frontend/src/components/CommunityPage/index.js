import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import * as communityActions from '../../store/community';
import * as channelActions from '../../store/channel';
import "./CommunityPage.css"
import { BsFillGearFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import CommunityEditForm from "../CommunityEditForm";
import { AiOutlinePlus } from "react-icons/ai";
import ChannelForm from "../ChannelForm";
import ChannelItem from "../ChannelItem";
import consumer from "../../util/consumer"


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

    useEffect(()=>{
        const sub = consumer.subscriptions.create({
            channel: "CommunityChannel",
            community_id: parseInt(communityid)
        },{
            received:(payload)=>{
                console.log(payload,"payload")
                console.log(payload.channel,"payload.channel")
                switch(payload.type){
                    case 'ADD_CHANNEL':
                        return dispatch(channelActions.addChannel(payload.channel))
                    case 'REMOVE_CHANNEL':
                        return dispatch(channelActions.removeChannel(payload.channel.id))
                }
            }
        })
        console.log(sub,"sub")
        return ()=> sub?.unsubscribe();
    },[dispatch,communityid])

    return (
        <div className="communityContainer">
        <div className="communityTitle">
        <h2 className="titleText">{community && community.title}</h2>
        <BsFillGearFill size={30} onClick={()=>{community && setOpenEdit(true)}}/>
        {openEdit && <CommunityEditForm setOpenEdit={setOpenEdit}/>}
        </div>
        <div className="communityTextHeader">
        <h3 className="textHeader">Text Channels</h3>
        <AiOutlinePlus size={30} onClick={()=>{channel && setOpenNewChannel(true)}}/>
        {openNewChannel && <ChannelForm setOpenNewChannel={setOpenNewChannel}/>}
        </div>
        <div className="communityChannelList">
        {channel.map((chan)=>{
            return <ChannelItem channel={chan} key={chan.id} setOpenNewChannel={setOpenNewChannel}/>
        })}
        </div>
        </div>
    )
};

export default CommunityPage;