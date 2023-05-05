import { useDispatch,useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as communityActions from '../../store/community';
import CommunityItem from "../CommunityItem";
import {AiFillPlusCircle} from "react-icons/ai"
import CommunityForm from "../CommunityForm";
import "./CommunityList.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import * as sessionActions from '../../store/session';
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import consumer from "../../util/consumer"

function CommunityList () {
    const dispatch = useDispatch();
    const history = useHistory();
    const communities = useSelector(communityActions.getCommunities)
    const [openModal,setOpenModal] = useState(false);
    const currentUserId = useSelector(sessionActions.getUser);
    const {communityid,channelid} = useParams();


    useEffect(()=>{
        dispatch(communityActions.fetchCommunities())
    },[dispatch])

    useEffect(()=>{
        if((communities.length > 0) && communityid === undefined && channelid === undefined){
            console.log(communities,"communities")
            history.push(`/users/${currentUserId}/${communities[0].id}`)
        }
    },[communities,channelid,history,currentUserId,communityid])

    useEffect(()=>{
        const sub = consumer.subscriptions.create({
            channel: "UserChannel",
            user_id: parseInt(currentUserId)
        },{
            received:()=>{
                dispatch(communityActions.fetchCommunities())
            }
        })
        console.log(sub,"sub")
        return ()=> sub?.unsubscribe();
    },[dispatch,currentUserId])


    return (
        <ul className="communityList">
            <button className="newCommunityButton" onClick={()=>{setOpenModal(true)}}><AiFillPlusCircle size={65} color={"green"}/></button>
            {openModal && <CommunityForm setOpenModal = {setOpenModal}/>}
            {communities.map((comm)=>{
                return <CommunityItem key={comm.id} community={comm}/>
            })}

        </ul>
    )

};

export default CommunityList;