import "./ChannelEditForm.css"
import React, { useState } from 'react';
import * as communityActions from '../../store/community';
import * as channelActions from '../../store/channel';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function ChannelEditForm ({channel, setOpenEditChannel}) {const dispatch = useDispatch();
    const currentUser = useSelector(sessionActions.getUser)
    const [title,setTitle] = useState(channel.title);
    const [errors, setErrors] = useState([]);
    const {communityid} = useParams();
    if (!currentUser){
        return <Redirect to={`/`}/>
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        let newChannel = {
            id: channel.id,
            title: title,
        }
        setErrors([]);
        setOpenEditChannel(false);
        return dispatch(channelActions.updateChannels(communityid,newChannel)).catch(async (res) => {
            let data = await res.json();
            if(data?.errors) {setErrors(data.errors)}
            else if (data) {setErrors([data])}
            else setErrors([res.statusText]);
        });
    }
    return (
        <div className='communityFormBackground' onClick={()=>{setOpenEditChannel(false)}}>
        <div className='communityFormContainer'>
        <form onSubmit={handleSubmit} onClick={(e)=>{e.stopPropagation()}}>
        <h2>Edit New Channel</h2>
        <label className='input'>Title
        <input type="text" value={title} 
        onChange={(e)=>{setTitle(e.target.value)}}
        required/>
        </label>
        <button className="button" type="submit">Edit Channel</button>
        <ul className='errors'>{errors.map((error)=>{return <li key={error}>{error}</li>})}</ul>
        </form>
        </div>        
        </div>
    )};

export default ChannelEditForm;