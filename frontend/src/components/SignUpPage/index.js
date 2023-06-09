import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './SignUpPage.css'
import NavigationFront from '../NavigationFront';
function SignUpPage () {
    const dispatch = useDispatch();
    const currentUser = useSelector(sessionActions.getUser)
    const [email,setEmail] = useState('');
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [matchPassword,setMatchPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (currentUser){
        return <Redirect to={`/users/${currentUser}/0`}/>
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(password === matchPassword){
        let user = {
            email: email,
            username: username,
            password: password
        }
        return dispatch(sessionActions.signup(user)).catch(async (res) => {
            let data = await res.json();
            if(data?.errors) {setErrors(data.errors)}
            else if (data) {setErrors([data])}
            else setErrors([res.statusText]);
        });
    }
    return setErrors(['Confirm Password must match the Password provided'])
    };
    return (
        <div className='backgroundLogin'>
        <NavigationFront/>
        <form className='signInForm' onSubmit={handleSubmit}>
        <h2 className='loginFormTitle'>Create an Account</h2>
        <label>EMAIL
        <input className='loginInput' type="text" value={email} 
        onChange={(e)=>{setEmail(e.target.value)}}
        required/>
        </label>
        <label>USERNAME
        <input className='loginInput' type="text" value={username} 
        onChange={(e)=>{setUsername(e.target.value)}}
        required/>
        </label>
        <label>PASSWORD
        <input className='loginInput' type="password" value={password} 
        onChange={(e)=>{setPassword(e.target.value)}}
        required/>
        </label>
        <label>CONFIRM PASSWORD
        <input className='loginInput' type="password" value={matchPassword} 
        onChange={(e)=>{setMatchPassword(e.target.value)}}
        required/>
        </label>
        <button className='loginButton' type="submit">Continue</button>
        <ul className='errors'>{errors.map((error)=>{return <li key={error}>{error}</li>})}</ul>
        </form>
        </div>
               
    )
};

export default SignUpPage;