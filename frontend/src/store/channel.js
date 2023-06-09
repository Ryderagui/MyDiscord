import csrfFetch from "./csrf";

const ADD_CHANNEL = 'channel/addChannel';
const ADD_CHANNELS = 'channel/addChannels'
const REMOVE_CHANNEL = 'channel/removeChannel';

export const addChannel = (channel)=>{
    return {
        type: ADD_CHANNEL,
        channel: channel
    }
}

export const addChannels = (channels)=>{
    return {
        type: ADD_CHANNELS,
        channels: channels
    }
}

export const removeChannel = (channelId)=>{
    return {
        type: REMOVE_CHANNEL,
        channelId: channelId
    }
}

const channelReducer = (state = {},action) =>{
    const newState = {...state};
    switch(action.type){
        case ADD_CHANNEL:
            
            return {...state, [action.channel.id]: action.channel}
        case ADD_CHANNELS:
            return {...action.channels}
        case REMOVE_CHANNEL:
            delete newState[action.channelId]
            return newState
        default:
            return state;
        
    }
}

export default channelReducer;

export const getChannel = (channelId) => (state)=>{
    if(state.channels){
        return state.channels[channelId]
    }else{
        return null;
    }
}

export const getChannels = (state)=>{
    if(state.channels){
        return Object.values(state.channels)
    }else{
        return [];
    }
}

export const fetchChannels = (communitiesId)=>async dispatch=>{
    let res = await csrfFetch(`/api/community/${communitiesId}/channels/`)
    if(res.ok){
        let data = await res.json();
        dispatch(addChannels(data));
    }
}

export const fetchChannel = (communitiesId,channelId)=>async dispatch =>{
    let res = await csrfFetch(`/api/community/${communitiesId}/channels/${channelId}`)
    if(res.ok){
        let data = await res.json();
        dispatch(addChannel(data));
    }
}

export const createChannels = (communitiesId,channel)=>async dispatch =>{
    let res = await csrfFetch(`/api/community/${communitiesId}/channels/`,{
        method: "POST",
        body: JSON.stringify(channel),
        headers: {
            'Content-Type':'application/json'
        }
    })
    if(res.ok){
        let data = await res.json();
        // dispatch(addChannel(data));
    }
}

export const updateChannels = (communitiesId,channel)=> async dispatch =>{
    let res = await csrfFetch(`/api/community/${communitiesId}/channels/${channel.id}`,{
        method: "PATCH",
        body: JSON.stringify(channel),
        headers: {
            'Content-Type':'application/json'
        }
    });
    if(res.ok){
        let data = await res.json();
        // dispatch(addChannel(data));
    }
}
export const deleteChannels = (communitiesId,channelId)=>async dispatch =>{
    let res = await csrfFetch(`/api/community/${communitiesId}/channels/${channelId}`,{
        method: "DELETE",
    })
    if(res.ok){
        // dispatch(removeChannel(channelId));
    }
}
