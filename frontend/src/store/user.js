import csrfFetch from "./csrf";

const ADD_USER = "user/addUser"

const addUser = (user)=> {
    return {
    type: ADD_USER,
    user: user
    }
}

const userReducer = (state = {},action) => {
    switch(action.type){
        case ADD_USER:
            return {...action.user}
        default:
            return state
    }
}

export default userReducer;

export const getUser = (state)=>{
    if(state.user){
        return state.user
    }else{
        return null;
    }
}

export const fetchUser = (userId)=> async dispatch =>{
    let res = await csrfFetch(`/api/users/${userId}`)

    if(res.ok){
        let data = await res.json();
        dispatch(addUser(data.user));
    }
}
