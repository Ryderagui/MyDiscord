import { useState,useEffect } from "react";
import * as communityActions from '../../store/community';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./CommunityEditForm.css"
import { useHistory } from "react-router-dom/cjs/react-router-dom";

function CommunityEditForm ({setOpenEdit}) {
    const dispatch = useDispatch();
    const currentUser = useSelector(sessionActions.getUser)
    const { communityid } = useParams();
    const community = useSelector(communityActions.getCommunity(communityid));
    const [title,setTitle] = useState(community.title);
    const [privacy,setPrivacy] = useState(community.privacy);
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    const handleSubmit = (e) =>{
        e.preventDefault();
        let newCommunity = {
            title: title,
            privacy: privacy,
            id: community.id
        }
        setErrors([]);
        setOpenEdit(false);
        return dispatch(communityActions.updateCommunities(newCommunity)).catch(async (res) => {
            let data = await res.json();
            if(data?.errors) {setErrors(data.errors)}
            else if (data) {setErrors([data])}
            else setErrors([res.statusText]);
        });
    }

    const handleDelete = (e) =>{
        e.preventDefault();
        setOpenEdit(false);
        dispatch(communityActions.deleteCommunities(community.id));
        history.push(`/users/${currentUser}/0`);
    };
    //The radio button takes two clicks for Private
    return (
        <div className='communityEditFormBackground' onClick={()=>{setOpenEdit(false)}}>
        <div className='communityEditFormContainer'>
        <form onSubmit={handleSubmit} onClick={(e)=>{e.stopPropagation()}}>
        <h2 className="communityEditFormTitle">Edit {community.title}</h2>
        <div className='communityEditFormLabel'>
        <label className='communityEditFormName'>TITLE
        <input className='communityEditFormInput' type="text" value={title} 
        onChange={(e)=>{setTitle(e.target.value)}}
        required/>
        </label>
        </div>
        <div className="communityEditFormButtonDiv">
        <button className="communityFormButton" type="button" onClick={handleDelete}> Delete Community</button>
        <button className="communityFormButton" type="submit">Edit Community</button>
        </div>
        <ul className='errors'>{errors.map((error)=>{return <li key={error}>{error}</li>})}</ul>
        </form>
        </div>        
        </div>
    )

};

export default CommunityEditForm;