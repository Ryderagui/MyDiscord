import "./CommunityIndexItem.css"
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/user";
import { createMembership } from "../../store/membership";
import { useEffect } from "react";

function CommunityIndexItem ({community, communitiesUser}) {
    const user = useSelector(getUser);
    const dispatch = useDispatch();
    console.log(community, communitiesUser, "Community Data");
    let verify = true;

    if(communitiesUser){
            let array = Object.values(communitiesUser);
            array.forEach((comm)=>{
            console.log(comm.id,community.id,"ID")
            if(community.id === comm.id){
                verify = false;
            }})
    }
    
    const handleMember = (e)=>{
        e.preventDefault();

        let membership = {
            username: user.username,
            userId: user.id,
            communityId: community.id
        }
        dispatch(createMembership(membership))
    }

    return (
        <div className='communityIndexItem'>
            <div className="leftWrapper">
                <div className="communityCircle">
                {community.title.substring(0,1)} 
                </div>
                <div className="communityTitleItem">
                    {community.title}
                </div>
            </div>
            <div className="rightWrapper">
                {verify && <div className="membershipButton" onClick={handleMember}>
                    Join
                </div>}
            </div>
        </div>
        
    )


};

export default CommunityIndexItem;
