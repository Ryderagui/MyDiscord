import "./MessageItem.css"
import * as utilActions from "../../util/consumer"
import * as sessionActions from '../../store/session';
import { AiOutlineClose } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as messageActions from '../../store/message';
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function MessageItem ({message}) {
    let date = utilActions.dateFormat(message.createdAt)
    const [hover,setHover] = useState(false);
    const [edit,setEdit] = useState(false);
    const [body,setBody] = useState(message.body)
    const dispatch = useDispatch();
    const {communityid,channelid} = useParams();
    const currentUserId = useSelector(sessionActions.getUser);


    const handleSubmit = (e)=> {
        e.preventDefault();

        let newMessage = {...message};
        newMessage.body = body;
        setEdit(false)
        return dispatch(messageActions.updateMessages(communityid,newMessage))
    } 

    const handleDelete = (e)=>{
        e.preventDefault();

        return dispatch(messageActions.deleteMessages(communityid,channelid,message.id))
    }

    let verify;
    if(message){
        verify = parseInt(currentUserId) === message.authorId
    }

    return (
        <div className="messageBox">
        {!edit && <div className="messageDefault" onMouseEnter={()=>{setHover(true)}} onMouseLeave={()=>{setHover(false)}}>
            <div className="messageTooltip" style={{display: (hover && verify) ? "inline-block" : "none"}}>
                <div className="pencilWrapper">
                    <BsFillPencilFill className="messagePencil" onClick={()=>{setEdit(true)}}/>
                </div>
                <div className="closeWrapper">
                    <AiOutlineClose className="messageClose" onClick={handleDelete}/>
                </div>
            </div>
            <div className="messageTop">
            <div className="messageUser">{`${message.username}`}</div>
            <div className="messageDate">{`${date}`}</div>
            </div>
            <div className="messageBody">
            {`${message.body}`}
            </div>

        </div>}
        {edit && <div className="messageEdit">
            <div className="messageTop">
            <div className="messageUser">{`${message.username}`}</div>
            <div className="messageDate">{`${date}`}</div>
            </div>
            <div className="messageBody">
            <form onSubmit={handleSubmit}>
            <input value={body} onChange={(e)=>{setBody(e.target.value)}}/>
            </form>
            </div>
        </div>}
        </div>
    )
};

export default MessageItem; 