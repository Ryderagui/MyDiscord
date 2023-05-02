import "./MessageItem.css"
import * as utilActions from "../../util/consumer"
import { AiOutlineClose } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";
import { useState } from "react";

function MessageItem ({message}) {
    console.log(message,"message before display")
    let date = utilActions.dateFormat(message.createdAt)
    const [hover,setHover] = useState(false);

    return (
        <div className="message" onMouseEnter={()=>{setHover(true)}} onMouseLeave={()=>{setHover(false)}}>
            <div className="messageTooltip" style={{display: hover ? "inline-block" : "none"}}><BsFillPencilFill size={20}/> <AiOutlineClose size={20}/></div>
            <div className="messageTop">
            <div className="messageUser">{`${message.username}`}</div>
            <div className="messageDate">{`${date}`}</div>
            </div>
            <div className="messageBody">
            {`${message.body}`}
            </div>
        
        </div>
    )
};

export default MessageItem; 