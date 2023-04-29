import "./MessageItem.css"

function MessageItem ({message}) {
    console.log(message,"message before display")

    return (
        <div className="message">{`${message.username}: ${message.body}`}
        
        </div>
    )
};

export default MessageItem; 