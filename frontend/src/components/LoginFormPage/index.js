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
        return <Redirect to="/"/>
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
            console.log(errors,"errors")
        });
    }
    return (
        <form onSubmit={handleSubmit}>
        <label className='input'>Username or Email
        <input type="text" value={credential} 
        onChange={(e)=>{setCredential(e.target.value)}}
        required/>
        </label>
        <label className='input'>Password
        <input type="password" value={password} 
        onChange={(e)=>{setPassword(e.target.value)}}
        required/>
        </label>
        <button className="button" type="submit">Log In</button>
        <ul className='errors'>{errors.map((error)=>{return <li key={error}>{error}</li>})}</ul>
        </form>        
    )
};

export default LoginFormPage;