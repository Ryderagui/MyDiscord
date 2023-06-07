import "./CommunityIndex.css"
import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";
import { fetchCommunities, getCommunities } from "../../store/community";
import CommunityIndexItem from "../CommunityIndexItem";

function CommunityIndex () {
    const dispatch = useDispatch();
    const communities = useSelector(getCommunities);
    
    useEffect(()=>{
        dispatch(fetchCommunities());
        
    },[dispatch])
    
    
   
     
    return (
        <div className="discoverWrapper">
            <div className="communityListArea">
                    {communities.length && communities.map((community)=>{
                        return <CommunityIndexItem key={community.id} community={community} />
                    }) }
            </div>
        </div>
    )


};

export default CommunityIndex;