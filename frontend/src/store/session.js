import csrfFetch from "./csrf";

const SET_CURRENT_USER = 'session/setCurrrentUser';
const REMOVE_CURRENT_USER = 'session/removeCurrentUser';

const setCurrentUser = (userId) =>{
    return {
        type: SET_CURRENT_USER,
        userId: userId
    }
};

const removeCurrentUser = (userId) => {
    return {
        type: REMOVE_CURRENT_USER,
        userId: userId
    }
}
const initialState = { currentUserId: null}

const sessionReducer = (state = initialState,action) => {
    switch(action.type){
        case REMOVE_CURRENT_USER:
            return {...state, currentUserId: action.userId}
        case SET_CURRENT_USER:
            return {...state, currentUserId: action.userId}
            default:
                return state;
        
    }
}

export default sessionReducer;

export const getUser = (state)=>{
    if(state.session.currentUserId){
        return state.session.currentUserId;
    }else{
        return null;
    }
}

export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const res = await csrfFetch('/api/session',{
        method: "POST",
        body: JSON.stringify({
            credential,
            password
        })
    });
    const data = await res.json();
    console.log(data,"data");
    dispatch(setCurrentUser(data.user.id))
    return res;
}