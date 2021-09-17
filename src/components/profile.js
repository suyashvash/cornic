import { useEffect, useState, useRef } from "react";
import { projectFirestore } from "../firebase/config";
import { selectUserEmail, setUserLogOutState } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { BiLogOut } from 'react-icons/bi';

export default function Profile(props) {
    const userEmailRedux = useSelector(selectUserEmail);
    const [userDetail, setUserDetail] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => { getUserDetails() }, [])

    const getUserDetails = () => {
        let detail = [];
        const docRef = projectFirestore.collection('users').doc(`${userEmailRedux}`)
        docRef.onSnapshot((doc) => { detail.push(doc.data()); setUserDetail(detail); })
    }

    const logout = () => { dispatch(setUserLogOutState()); props.history.push({ pathname: '/' }); }

    return (
        <div className="profile-page">
            {userDetail.length !== 0 &&
                <div className="profile-card">
                    <img src={userDetail[0].profilePic} width={100} alt="profile pic" />
                    <div className="profile-sub-head">
                        <h3 className="name">{userDetail[0].name}</h3>
                        <span className="user-bio">"{userDetail[0].userBio}"</span>
                        <h3 className="user-name">{userDetail[0].userName}</h3>
                        <span className="user-email">{userDetail[0].userEmail}</span>
                        <Button size={'sm'} onClick={logout} className="sub-ans log-out" variant="light"><BiLogOut size={20} /> Log out</Button>
                    </div>
                </div>
                /* <div className="profile-card data-card" >
                    <h4 className="question-head">My Questions</h4>
                    <h5>Q here is the question ?</h5>
                </div> */
            }
        </div >
    )
}