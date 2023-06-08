import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom/cjs/react-router-dom";
import "./CommunityItem.css"
import { Redirect, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// Refactor to better handle click to swap to active Community

function CommunityItem ({community}) {
    const currentUserId = useSelector(sessionActions.getUser)
    const history = useHistory();
    let channelDefault = 0;
    if(community.default){
        channelDefault = community.default.id
    }
    return (
        <div className='communityItem'>
        <button type="button" className="communityLink" onClick={()=>{history.push(`/users/${currentUserId}/${community.id}/${channelDefault}`)}}>
        {community.title.substring(0,1)}
        </button>
        </div>
    )
};

export default CommunityItem;