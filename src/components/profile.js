import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";
import { selectUserEmail } from "../features/userSlice";
import { useSelector } from "react-redux";
import userPic from '../assets/user.png'

export default function Profile() {
    const userEmailRedux = useSelector(selectUserEmail);
    const [userDetail, setUserDetail] = useState([]);

    useEffect(() => {
        getUserDetails()
    }, [])

    const getUserDetails = () => {
        let detail = [];
        const docRef = projectFirestore.collection('users').doc(`${userEmailRedux}`)
        docRef.onSnapshot((doc) => {
            detail.push(doc.data())
            setUserDetail(detail)
        })

    }

    return (
        <div className="profile-page">

            {userDetail &&
                userDetail.map((item, index) => (
                    <>
                        <div className="profile-card" key={index}>
                            <h3 className="profile-head">My Profile</h3>
                            <img src={item.profilePic} width={90} alt="profile pic" />
                            <h3 className="user-name">{item.userName}</h3>
                            <span className="user-id">{item.userId}</span>
                            <span className="user-email">{item.userEmail}</span>
                            <span className="user-bio">"{item.userBio}"</span>
                        </div>

                        <div className="profile-card data-card" key={index}>
                            <h4 className="profile-head">My Questions</h4>
                            <h3 className="user-questions">{item.userQuestions}</h3>

                        </div>
                    </>

                ))
            }


        </div >
    )
}