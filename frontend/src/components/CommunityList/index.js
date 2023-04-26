import { useDispatch,useSelector } from "react-redux";
import { useEffect, } from "react";
import * as communityActions from '../../store/community';
import CommunityItem from "../CommunityItem";



function CommunityList () {
    const dispatch = useDispatch();
    const communities = useSelector(communityActions.getCommunities)
    console.log(communities,"communities in ComList")
    useEffect(()=>{
        dispatch(communityActions.fetchCommunities())
    },[dispatch])

    

    return (
        <ul>
            {communities.map((comm)=>{
                return <CommunityItem key={comm.id} community={comm}/>
            })}
        </ul>
    )

};

export default CommunityList;