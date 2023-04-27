import { useDispatch,useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as communityActions from '../../store/community';
import CommunityItem from "../CommunityItem";
import {AiFillPlusCircle} from "react-icons/ai"
import CommunityForm from "../CommunityForm";
import "./CommunityList.css";

function CommunityList () {
    const dispatch = useDispatch();
    const communities = useSelector(communityActions.getCommunities)
    const [openModal,setOpenModal] = useState(false);
    useEffect(()=>{
        dispatch(communityActions.fetchCommunities())
    },[dispatch])


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