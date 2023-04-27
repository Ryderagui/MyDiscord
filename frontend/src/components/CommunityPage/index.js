import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import * as communityActions from '../../store/community';
import "./CommunityPage.css"
import { BsFillGearFill } from "react-icons/bs";
import { useState } from "react";
import CommunityEditForm from "../CommunityEditForm";


function CommunityPage () {
    const {communityid} = useParams();
    const community = useSelector(communityActions.getCommunity(communityid));
    const [openEdit,setOpenEdit] = useState(false);



    return (
        <div className="communityContainer">
        <div className="communityTitle">
        <h2 className="titleText">{community && community.title}</h2>
        <BsFillGearFill size={30} onClick={()=>{setOpenEdit(true)}}/>
        {openEdit && <CommunityEditForm setOpenEdit={setOpenEdit}/>}
        </div>
        <h3>General</h3>
        </div>
    )
};

export default CommunityPage;