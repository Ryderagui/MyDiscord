import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import * as channelActions from '../../store/channel';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom";
import {BiHash} from "react-icons/bi"
import "./ChannelItem.css"

function ChannelItem ({channel}) {
    const dispatch = useDispatch();
    const currentUserId = useSelector(sessionActions.getUser);
    const {communityid} = useParams();
    const history = useHistory();
    const handleDeleteChannel = (e) => {
        e.preventDefault();
        return dispatch(channelActions.deleteChannels(communityid,channel.id));
    }
    const handleLink = (e)=>{
        e.preventDefault();
        history.push(`/users/${currentUserId}/${communityid}/${channel.id}`)
    }
    return ( <div>
        <div className="channelItemTitle" onClick={()=>{history.push(`/users/${currentUserId}/${communityid}/${channel.id}`)}}>
        <BiHash size={30}/>
        {` ${channel.title}`}
        </div>
        <AiOutlineClose onClick={handleDeleteChannel} size={30}/>
        </div>  
    )
};

export default ChannelItem;