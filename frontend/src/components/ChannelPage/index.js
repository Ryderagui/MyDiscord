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
    let messageArea = document.getElementById("messageArea");

    useEffect(()=>{
        if(communityid && channelid){
            dispatch(messageActions.fetchMessages(communityid,channelid))
        }
    },[dispatch,communityid,channelid])

    useEffect(()=>{
        if(messageArea){
            messageArea.scroll(0,messageArea.scrollHeight);
        }
    },[messageArea,messages])

    useEffect(()=>{
        const sub = consumer.subscriptions.create({
            channel: "ChatChannel",
            channel_id: parseInt(channelid)
        },{
            received:(payload)=>{
                switch(payload.type){
                    case 'ADD_MESSAGE':
                        return dispatch(messageActions.addMessage(payload.message))
                    case 'REMOVE_MESSAGE':
                        return dispatch(messageActions.removeMessage(payload.message.id))
                }
            }
        })
        return ()=> sub?.unsubscribe();
    },[dispatch,channelid])

    const handleSubmit  = (e) =>{
        e.preventDefault()
        let message = {
            body: body,
            author_id: currentUserId,
            channel_id: channelid
        }
        if(message.body.length !== ''){
            dispatch(messageActions.createMessages(communityid,message))
        }
        setBody('');
    }
    return(
        <div className="channelPage">
            <div className="chatBox">
                <div className="messageArea" id="messageArea">
                    <div className="chatMessages">
                    {messages.map((message)=>{
                        return(
                            <MessageItem message={message} key={message.id}/>
                        )
                    })}
                    </div>
                </div>
                <div className="chatForm"> 
                    <form onSubmit={handleSubmit}>
                    <input type="textarea" value={body} onChange={(e)=>{setBody(e.target.value)}}/>
                    </form>
                    </div>
            </div>
        </div>
        
        
       
    )
};

export default ChannelPage