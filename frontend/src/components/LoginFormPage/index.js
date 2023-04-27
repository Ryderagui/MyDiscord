import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import "./LoginFormPage.css"

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

    const handleDemo = (e) => {
        e.preventDefault();

        let user = {
            credential: "Patrick",
            password: "password"
        }
        return dispatch(sessionActions.login(user))
    }

    return (
        <div className='backgroundLogin'>
        <form className="loginForm" onSubmit={handleSubmit}>
        <h2>Log In!</h2>
        <label>Username or Email
        <input  className='loginInput' type="text" value={credential} 
        onChange={(e)=>{setCredential(e.target.value)}}
        required/>
        </label>
        <label>Password
        <input className='loginInput' type="password" value={password} 
        onChange={(e)=>{setPassword(e.target.value)}}
        required/>
        </label>
        <button className="button" type="submit">Log In</button>
        <button className="button" type="button" onClick={handleDemo}>Demo User</button>
        <ul className='errors'>{errors.map((error)=>{return <li key={error}>{error}</li>})}</ul>
        
        </form> 
        
        </div>       
    )
};

export default LoginFormPage;