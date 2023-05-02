import "./MessageItem.css"
import * as utilActions from "../../util/consumer"

function MessageItem ({message}) {
    console.log(message,"message before display")
    let date = utilActions.dateFormat(message.createdAt)
    return (
        <div className="message">
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