import { useEffect, useState } from "react";
// import { projectFirestore } from "../firebase/config";
import { selectUserEmail } from "../features/userSlice";
import { useSelector } from "react-redux";
import userPic from '../assets/user.png'

export default function Profile() {
    const userEmailRedux = useSelector(selectUserEmail);

    return (
        <div className="profile-page">
            <div className="profile-card">
                <img src={userPic} width={90} alt="profile pic" />
                <h5>{userEmailRedux}</h5>
                <p>Hello I am a corniac.</p>
            </div>
        </div>
    )
}