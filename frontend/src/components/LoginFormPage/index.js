import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function LoginFormPage () {
    const dispatch = useDispatch();
    const currentUser = useSelector(sessionActions.getUser)
    const [credential,setCredential] = useState('');
    const [password,setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (currentUser){
        return <Redirect to="/"/>
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        let user = {
            credential: credential,
            password: password
        }
        return dispatch(sessionActions.login(user))
    }
    return (
        <form onSubmit={handleSubmit}>
        <label>Username or Email
        <input type="text" value={credential} 
        onChange={(e)=>{setCredential(e.target.value)}}/>
        </label>
        <label>Password
        <input type="password" value={password} 
        onChange={(e)=>{setPassword(e.target.value)}}/>
        </label>
        <button type="submit">Log In</button>
        </form>        
    )
};

export default LoginFormPage;