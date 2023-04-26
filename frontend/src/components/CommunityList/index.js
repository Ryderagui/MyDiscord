import { useDispatch,useSelector } from "react-redux";
import { useState,useEffect, } from "react";
import * as communityActions from '../../store/community';



function CommunityList () {
    const dispatch = useDispatch();
    const communities = useSelector(communityActions.getCommunities())

    useEffect(()=>{
        dispatch(communityActions.fetchCommunities())
    },[dispatch])

    

    return (
        <ul>
            {communities.map((comm)=>{
                return <li>{comm.title}</li>
            })}
        </ul>
    )

};

export default CommunityList;