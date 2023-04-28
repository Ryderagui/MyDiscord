import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import * as communityActions from '../../store/community';
import * as channelActions from '../../store/channel';
import * as sessionActions from '../../store/session';
import * as messageActions from '../../store/message';
import { useState, useEffect } from "react";
import "./ChannelPage.css"
import MessageItem from "../MessageItem";
import consumer from "../../util/consumer"

function ChannelPage () {
    const dispatch = useDispatch();
    const currentUserId = useSelector(sessionActions.getUser)
    const {communityid, channelid} = useParams();
    // console.log(useParams(),"params");
    const channel = useSelector(channelActions.getChannel(channelid));
    const [body,setBody] = useState('');
    const messages = useSelector(messageActions.getMessages);

    useEffect(()=>{
        dispatch(messageActions.fetchMessages(communityid,channelid))
    },[dispatch,communityid,channelid])

    useEffect(()=>{
        const sub = consumer.subscriptions.create({
            channel: "ChatChannel",
            channel_id: parseInt(channelid)
        },{
            received:(payload)=>{
                console.log(payload,"payload")
                switch(payload.type){
                    case 'ADD_MESSAGE':
                        dispatch(messageActions.addMessage(payload.payload))
                }
            }
        })
        console.log(sub,"sub")
        return ()=> sub?.unsubscribe();
    },[dispatch,channelid])

    const handleSubmit  = (e) =>{
        e.preventDefault()
        let message = {
            body: body,
            author_id: currentUserId,
            channel_id: channelid
        }
        dispatch(messageActions.createMessages(communityid,message))
        setBody('');
    }
    return(
        <div>
        <div className="chatBox">
        <h2>{channel && channel.title}</h2>
        {messages.map((message)=>{
            return(
                <MessageItem message={message} key={message.id}/>
            )
        })}
        </div>
        <div>
        <form onSubmit={handleSubmit}>
        <label>Message
        <input type="textarea" value={body} onChange={(e)=>{setBody(e.target.value)}}/>
        </label>
        <button type="submit">Create Message</button>
        </form>
        </div>
        </div>
        
       
    )
};

export default ChannelPage