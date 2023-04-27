import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom/cjs/react-router-dom";
import "./CommunityItem.css"

// Refactor to better handle click to swap to active Community
function CommunityItem ({community}) {
    const currentUserId = useSelector(sessionActions.getUser)
    
    return (
        <div className='communityItem'>
        <Link to={`/users/${currentUserId}/${community.id}`}>
        {community.title}
        </Link>
        </div>
    )
};

export default CommunityItem;