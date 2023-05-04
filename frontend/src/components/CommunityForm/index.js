import React, { useState } from 'react';
import * as communityActions from '../../store/community';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import "./CommunityForm.css"

function CommunityForm ({setOpenModal}) {const dispatch = useDispatch();
    const currentUser = useSelector(sessionActions.getUser)
    const [title,setTitle] = useState('');
    const [privacy,setPrivacy] = useState(true);
    const [errors, setErrors] = useState([]);

    if (!currentUser){
        return <Redirect to={`/`}/>
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        let community = {
            title: title,
            privacy: privacy
        }
        setErrors([]);
        setOpenModal(false);
        return dispatch(communityActions.createCommunities(community)).catch(async (res) => {
            let data = await res.json();
            if(data?.errors) {setErrors(data.errors)}
            else if (data) {setErrors([data])}
            else setErrors([res.statusText]);
        });
    }
    //The radio button takes two clicks for Private
    return (
        <div className='communityFormBackground' onClick={()=>{setOpenModal(false)}}>
        <div className='communityFormContainer'>
        <form onSubmit={handleSubmit} onClick={(e)=>{e.stopPropagation()}}>
        <h2 className='channelFormTitle'>Create a Community!</h2>
        <label className='channelFormName'>TITLE
        <input className='channelFormInput' type="text" value={title} 
        onChange={(e)=>{setTitle(e.target.value)}}
        required/>
        </label>
        <button className="channelFormButton" type="submit">Create Community</button>
        <ul className='errors'>{errors.map((error)=>{return <li key={error}>{error}</li>})}</ul>
        </form>
        </div>        
        </div>
    )};

export default CommunityForm;