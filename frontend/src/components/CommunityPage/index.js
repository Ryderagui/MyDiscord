import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import * as communityActions from '../../store/community';
import * as channelActions from '../../store/channel';
import * as sessionActions from '../../store/session';
import * as membershipActions from '../../store/membership';
import "./CommunityPage.css"
import { BsFillGearFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import CommunityEditForm from "../CommunityEditForm";
import { AiOutlinePlus } from "react-icons/ai";
import ChannelForm from "../ChannelForm";
import ChannelItem from "../ChannelItem";
import consumer from "../../util/consumer"


function CommunityPage () {
    const currentUserId = useSelector(sessionActions.getUser);
    const dispatch = useDispatch();
    const history = useHistory();
    const {communityid, channelid} = useParams();
    const community = useSelector(communityActions.getCommunity(communityid));
    const [openEdit,setOpenEdit] = useState(false);
    const channel = useSelector(channelActions.getChannels);
    const [openNewChannel,setOpenNewChannel] = useState(false);
    const [username,setUsername] = useState('');

    useEffect(()=>{
        if(communityid){
        dispatch(channelActions.fetchChannels(communityid))
        }
    },[dispatch,communityid])

    useEffect(()=>{
        if(community && channelid === undefined){
            let defaultid = community.default.id
            history.push(`/users/${currentUserId}/${community.id}/${defaultid}`)
        }
    },[channel,communityid,channelid])

    useEffect(()=>{
        const sub = consumer.subscriptions.create({
            channel: "CommunityChannel",
            community_id: parseInt(communityid)
        },{
            received:(payload)=>{
                switch(payload.type){
                    case 'ADD_CHANNEL':
                        return dispatch(channelActions.addChannel(payload.channel))
                    case 'REMOVE_CHANNEL':
                        return dispatch(channelActions.removeChannel(payload.channel.id))
                }
            }
        })
        return ()=> sub?.unsubscribe();
    },[dispatch,communityid])
    let verifyUser = null;
    if(community){
       verifyUser = parseInt(currentUserId) === community.userId
    }
    let verifyChannel = null;
    if(channelid){
        verifyChannel = channelid;
    }
    const handleInvite = (e)=>{
        e.preventDefault();

        let membership = {
            username: username,
            communityId: communityid
        }
      
        setUsername('')
        dispatch(membershipActions.createMembership(membership))
    }

    return (
        <div className="communityContainer">
            <div className="communityTitle">
                <h2 className="titleText">{community && community.title}</h2>
                <BsFillGearFill size={30} onClick={()=>{community && setOpenEdit(true)}} style={{display: verifyUser ? "block" : "none"}} />
                <div className="communityEditFormDiv">
                {openEdit && <CommunityEditForm setOpenEdit={setOpenEdit}/>}
                </div>
            </div>
            <div className="communityTextHeader">
                <h3 className="textHeader">Text Channels</h3>
                <AiOutlinePlus size={30} onClick={()=>{channel && setOpenNewChannel(true)}} style={{display: verifyUser ? "block" : "none"}}/>
                {openNewChannel && <ChannelForm setOpenNewChannel={setOpenNewChannel}/>}
            </div>
            <div className="communityChannelList">
                {channel.map((chan)=>{
                    return <ChannelItem channel={chan} key={chan.id} setOpenNewChannel={setOpenNewChannel}/>
                })}
            </div>
            <div className="communityInviteArea" style={{display: verifyUser ? "block" : "none"}}>
            <div className="communityInviteHeader" >
                <h3 className="textHeader">Invite by Username:</h3>
            </div>
            <div className="communityInviteInput">
            <form onSubmit={handleInvite}>
            <input className="inviteUsernameInput" type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>    
            </form>    
            </div>
            </div>
        </div>
    )
};

export default CommunityPage;