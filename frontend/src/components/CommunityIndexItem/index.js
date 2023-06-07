import "./CommunityIndexItem.css"
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/session";
import { createMembership } from "../../store/membership";

function CommunityIndexItem ({community,key}) {
    const user = useSelector(getUser);
    const dispatch = useDispatch();
    const handleMember = (e)=>{
        e.preventDefault();

        let membership = {
            userId: user.id,
            communityId: key
        }
        dispatch(createMembership(membership))
    }

    return (
        <div className='communityItem'>
            <div className="leftWrapper">
                <div className="communityCircle">
                {community.title.substring(0,1)} 
                </div>
                <div className="communityTitleItem">
                    {community.title}
                </div>
            </div>
            <div className="rightWrapper">
                <div className="membershipButton" onClick={handleMember}>
                    Join
                </div>
            </div>
        </div>
        
    )


};

export default CommunityIndexItem;
