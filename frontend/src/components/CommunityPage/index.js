import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import * as communityActions from '../../store/community';
import * as channelActions from '../../store/channel';
import "./CommunityPage.css"
import { BsFillGearFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import CommunityEditForm from "../CommunityEditForm";
import channelReducer from "../../store/channel";
import { AiOutlinePlus } from "react-icons/ai";


function CommunityPage () {
    const dispatch = useDispatch();
    const {communityid} = useParams();
    const community = useSelector(communityActions.getCommunity(communityid));
    const [openEdit,setOpenEdit] = useState(false);
    const channels = useSelector(channelActions.getChannels);

    useEffect(()=>{

        dispatch(channelActions.fetchChannels(communityid))

    },[dispatch,communityid])

    return (
        <div className="communityContainer">
        <div className="communityTitle">
        <h2 className="titleText">{community && community.title}</h2>
        <BsFillGearFill size={30} onClick={()=>{community && setOpenEdit(true)}}/>
        {openEdit && <CommunityEditForm setOpenEdit={setOpenEdit}/>}
        </div>
        <h3 className="textHeader">Text Channels</h3>
        <AiOutlinePlus/>
        <ul>
        {channels.map((channel)=>{
            return <li>{channel.title}</li>
        })}
        </ul>
        </div>
    )
};

export default CommunityPage;