import csrfFetch from "./csrf";

const ADD_MESSAGE = 'message/addMessage';
const ADD_MESSAGES = 'message/addmessages'
const REMOVE_MESSAGE = 'message/removemessage';

export const addMessage = (message)=>{
    return {
        type: ADD_MESSAGE,
        message: message
    }
}

export const addMessages = (messages)=>{
    return {
        type: ADD_MESSAGES,
        messages: messages
    }
}

export const removeMessage = (messageId)=>{
    return {
        type: REMOVE_MESSAGE,
        messageId: messageId
    }
}

export const messageReducer = (state = {},action) =>{
    const newState = {...state};
    switch(action.type){
        case ADD_MESSAGE:
            return {...state, [action.message.id]: action.message}
        case ADD_MESSAGES:
            return {...action.messages}
        case REMOVE_MESSAGE:
            delete newState[action.messageId]
            return newState
        default:
            return state;
        
    }
}

export default messageReducer;

export const getMessage = (messageId) => (state)=>{
    if(state.messages){
        return state.messages[messageId]
    }else{
        return null;
    }
}

export const getMessages = (state)=>{
    if(state.messages){
        return Object.values(state.messages)
    }else{
        return [];
    }
}

export const fetchMessages = (communitiesId,channelId)=>async dispatch=>{
    let res = await csrfFetch(`/api/community/${communitiesId}/channels/${channelId}/messages`)
    if(res.ok){
        let data = await res.json();
        console.log(data,"messages")
        dispatch(addMessages(data));
    }
}

export const createMessages = (communitiesId,message)=>async dispatch =>{
    let res = await csrfFetch(`/api/community/${communitiesId}/channels/${message.channel_id}/messages`,{
        method: "POST",
        body: JSON.stringify(message),
        headers: {
            'Content-Type':'application/json'
        }
    })
    if(res.ok){
        let data = await res.json();
        // dispatch(addMessage(data));
    }
}

// export const updatemessages = (communitiesId,message)=> async dispatch =>{
//     let res = await csrfFetch(`/api/community/${communitiesId}/messages/${message.id}`,{
//         method: "PATCH",
//         body: JSON.stringify(message),
//         headers: {
//             'Content-Type':'application/json'
//         }
//     });
//     if(res.ok){
//         let data = await res.json();
//         dispatch(addmessage(data));
//     }
// }

export const deletemessages = (communitiesId,channelId,messageId)=>async dispatch =>{
    let res = await csrfFetch(`/api/community/${communitiesId}/channels/${channelId}/messages/${messageId}`,{
        method: "DELETE",
    })
    if(res.ok){
        dispatch(removeMessage(messageId));
    }
}
