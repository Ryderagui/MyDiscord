import "./CommunityIndex.css"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState} from "react";
import { fetchCommunities, getCommunities, fetchUserCommunities } from "../../store/community";
import CommunityIndexItem from "../CommunityIndexItem";

function CommunityIndex () {
    const dispatch = useDispatch();
    const communitiesState = useSelector(getCommunities);
    const [communitiesUser,setCommunitiesUser] = useState('');
    const [communitiesUserArray,setCommunitiesUserArray] = useState([]);
    useEffect(()=>{
        dispatch(fetchCommunities());
        updateCommunityList();
    },[dispatch])
    
    async function updateCommunityList () {
        let temp = await dispatch(fetchUserCommunities())
        setCommunitiesUser(temp);
        setCommunitiesUserArray(Object.values(communitiesUser));
    }
   
     
    return (
        <div className="discoverWrapper">
            <div className="communityListArea">
                    {communitiesState.length && communitiesState.map((community)=>{
                        return <CommunityIndexItem key={community.id} community={community} communitiesUser={communitiesUser}/>
                    }) }
            </div>
        </div>
    )


};

export default CommunityIndex;