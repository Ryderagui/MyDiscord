import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import * as channelActions from '../../store/channel';
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";


function ChannelItem ({channel}) {
    const dispatch = useDispatch();
    const {communityid} = useParams();
    const handleDeleteChannel = (e) => {
        e.preventDefault();
        return dispatch(channelActions.deleteChannels(communityid,channel.id));
    }
    return ( <div>
        <li>{channel.title}</li>
        <AiOutlineClose onClick={handleDeleteChannel} size={30}/>
        </div>  
    )
};

export default ChannelItem;