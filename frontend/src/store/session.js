import csrfFetch from "./csrf";

const SET_CURRENT_USER = 'session/setCurrrentUser';
const REMOVE_CURRENT_USER = 'session/removeCurrentUser';

const setCurrentUser = (userId) =>{
    return {
        type: SET_CURRENT_USER,
        userId: userId
    }
};

const removeCurrentUser = () => {
    return {
        type: REMOVE_CURRENT_USER,
        userId: null
    }
}
const initialState = { currentUserId: sessionStorage.getItem("currentUserId")}

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

export const signup = (user) => async (dispatch) => {
    const { email, username , password } = user;
    const res = await csrfFetch('/api/users',{
        method: "POST",
        body: JSON.stringify({
            email,
            username,
            password
        })
    });
    const data = await res.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user.id))
    return res;
}

export const logout = () => async (dispatch) => {
    const res = await csrfFetch('/api/session',{
        method: "DELETE",
        });
    const data = await res.json();
    storeCurrentUser(null);
    dispatch(removeCurrentUser())
    return res;
}


const storeCSRFToken = (response) => {
    const csrfToken = response.headers.get("X-CSRF-Token");
    if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}

const storeCurrentUser = (user) => {
    if(user){
        sessionStorage.setItem("currentUserId", user.id);
    }else{
        sessionStorage.removeItem("currentUserId")
    }
}

export const restoreSession = ()=>async dispatch => {
    const res = await csrfFetch("/api/session");
    storeCSRFToken(res);
    const data = await res.json();
    storeCurrentUser(data.user);
    console.log(data.user,"data.user");
    if(data.user){
    dispatch(setCurrentUser(data.user.id));
    }
    return res;
}