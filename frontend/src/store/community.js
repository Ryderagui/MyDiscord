import csrfFetch from "./csrf";

const ADD_COMMUNITY = 'community/addCommunity';
const ADD_COMMUNITIES = 'community/addCommunities'
const REMOVE_COMMUNITY = 'community/removeCommunity';

const addCommunity = (community)=>{
    return {
        type: ADD_COMMUNITY,
        community: community
    }
}

const addCommunities = (communities)=>{
    return {
        type: ADD_COMMUNITIES,
        communities: communities
    }
}

const removeCommunity = (communityId)=>{
    return {
        type: REMOVE_COMMUNITY,
        communityId: communityId
    }
}

const communityReducer = (state = {},action) =>{
    const newState = {...state};
    switch(action.type){
        case ADD_COMMUNITY:
            return {...state, [action.community.id]: action.community}
        case ADD_COMMUNITIES:
            return {...action.communities}
        case REMOVE_COMMUNITY:
            delete newState[action.communityId]
            return newState
        default:
            return state;
        
    }
}

export default communityReducer;

export const getCommunity = (communityId) => (state)=>{
    if(state.communities){
        return state.communities[communityId]
    }else{
        return null;
    }
}

export const getCommunities = (state)=>{
    if(state.communities){
        return Object.values(state.communities)
    }else{
        return [];
    }
}

export const fetchCommunities = ()=>async dispatch=>{
    let res = await csrfFetch('/api/community/')
    if(res.ok){
        let data = await res.json();
        console.log(data,"Communities")
        dispatch(addCommunities(data));
    }
}

export const fetchCommunity = (communityId)=>async dispatch =>{
    let res = await csrfFetch(`/api/community/${communityId}`)
    if(res.ok){
        let data = await res.json();
        dispatch(addCommunity(data));
    }
}

export const createCommunities = (communities)=>async dispatch =>{
    let res = await csrfFetch(`/api/community/`,{
        method: "POST",
        body: JSON.stringify(communities),
        headers: {
            'Content-Type':'application/json'
        }
    })
    if(res.ok){
        let data = await res.json();
        dispatch(addCommunity(data));
    }
}

export const updateCommunities = (communities)=> async dispatch =>{
    let communitiesId = communities.id;
    let res = await csrfFetch(`/api/community/${communitiesId}`,{
        method: "PATCH",
        body: JSON.stringify(communities),
        headers: {
            'Content-Type':'application/json'
        }
    });
    if(res.ok){
        let data = await res.json();
        dispatch(addCommunity(data));
    }
}
export const deleteCommunities = (communitiesId)=>async dispatch =>{
    let res = await csrfFetch(`/api/Communitiess/${communitiesId}`,{
        method: "DELETE",
    })
    if(res.ok){
        dispatch(removeCommunity(communitiesId));
    }
}
