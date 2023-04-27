import { useState,useEffect } from "react";
import * as communityActions from '../../store/community';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./CommunityEditForm.css"

function CommunityEditForm ({setOpenEdit}) {
    const dispatch = useDispatch();
    const currentUser = useSelector(sessionActions.getUser)
    const { communityid } = useParams();
    const community = useSelector(communityActions.getCommunity(communityid));
    const [title,setTitle] = useState(community.title);
    const [privacy,setPrivacy] = useState(community.privacy);
    const [errors, setErrors] = useState([]);

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
        return dispatch(communityActions.deleteCommunities(community.id));
    };
    //The radio button takes two clicks for Private
    return (
        <div className='communityEditBackground' onClick={()=>{setOpenEdit(false)}}>
        <div className='communityFormContainer'>
        <form onSubmit={handleSubmit} onClick={(e)=>{e.stopPropagation()}}>
        <h2>Edit {community.title}</h2>
        <label className='input'>Title
        <input type="text" value={title} 
        onChange={(e)=>{setTitle(e.target.value)}}
        required/>
        </label>
        <label className='input'>Public
        <input type="radio" name="privacy" value={true} checked={privacy}
        onChange={(e)=>{setPrivacy(e.target.value)}}
        />
        </label>
        <label className='input'>Private
        <input type="radio" name="privacy" value={false} checked={privacy === "false"}
        onChange={(e)=>{setPrivacy(e.target.value)}}
        />
        </label>
        <button className="button" type="submit">Edit Community</button>
        <button className="button" type="button" onClick={handleDelete}> Delete Community</button>
        <ul className='errors'>{errors.map((error)=>{return <li key={error}>{error}</li>})}</ul>
        </form>
        </div>        
        </div>
    )

};

export default CommunityEditForm;