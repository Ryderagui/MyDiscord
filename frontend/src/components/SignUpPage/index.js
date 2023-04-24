import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function SignUpPage () {
    const dispatch = useDispatch();
    const currentUser = useSelector(sessionActions.getUser)
    const [email,setEmail] = useState('');
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [matchPassword,setMatchPassword] = useState('');
    const [errors, setErrors] = useState([]);

    // if (currentUser){
    //     return <Redirect to="/"/>
    // }

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(password === matchPassword){
        let user = {
            email: email,
            username: username,
            password: password
        }
        return dispatch(sessionActions.login(user))
        }
    }
    return (
        <form onSubmit={handleSubmit}>
        <label>Email
        <input type="text" value={email} 
        onChange={(e)=>{setEmail(e.target.value)}}/>
        </label>
        <label>Username
        <input type="text" value={username} 
        onChange={(e)=>{setUsername(e.target.value)}}/>
        </label>
        <label>Password
        <input type="password" value={password} 
        onChange={(e)=>{setPassword(e.target.value)}}/>
        </label>
        <label>Confirm Password
        <input type="password" value={matchPassword} 
        onChange={(e)=>{setMatchPassword(e.target.value)}}/>
        </label>
        <button type="submit">Sign Up</button>
        </form>        
    )
};

export default SignUpPage;