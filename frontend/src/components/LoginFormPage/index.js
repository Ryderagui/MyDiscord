import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import "./LoginFormPage.css"
import NavigationFront from '../NavigationFront';

function LoginFormPage () {
    const dispatch = useDispatch();
    const currentUser = useSelector(sessionActions.getUser)
    const [credential,setCredential] = useState('');
    const [password,setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (currentUser){
        return <Redirect to={`/users/${currentUser}`}/>
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        let user = {
            credential: credential,
            password: password
        }
        setErrors([]);
        return dispatch(sessionActions.login(user)).catch(async (res) => {
            let data = await res.json();
            if(data?.errors) {setErrors(data.errors)}
            else if (data) {setErrors([data])}
            else setErrors([res.statusText]);
        });
    }

    const handleDemoOne = (e) => {
        e.preventDefault();

        let user = {
            credential: "Patrick",
            password: "password"
        }
        return dispatch(sessionActions.login(user))
    }
    const handleDemoTwo = (e) => {
        e.preventDefault();

        let user = {
            credential: "Jane",
            password: "tiktok"
        }
        return dispatch(sessionActions.login(user))
    }

    return (
        <div className='backgroundLogin'>
        <NavigationFront/>
        <form className="loginForm" onSubmit={handleSubmit}>
        <h2 className='loginFormTitle'>Log In</h2>
        <label>USERNAME OR EMAIL
        <input  className='loginInput' type="text" value={credential} 
        onChange={(e)=>{setCredential(e.target.value)}}
        required/>
        </label>
        <label>PASSWORD
        <input className='loginInput' type="password" value={password} 
        onChange={(e)=>{setPassword(e.target.value)}}
        required/>
        </label>
        <button className="loginButton" type="submit">Log In</button>
        <button className="loginButton" type="button" onClick={handleDemoOne}>Demo User One</button>
        <button className="loginButton" type="button" onClick={handleDemoTwo}>Demo User Two</button>
        <ul className='errors'>{errors.map((error)=>{return <li key={error}>{error}</li>})}</ul>
        
        </form> 
        
        </div>       
    )
};

export default LoginFormPage;