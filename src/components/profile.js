import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";
import { selectUserEmail, setUserLogOutState } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";

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

    const logout = () => {
        dispatch(setUserLogOutState());
        props.history.push({ pathname: '/' });
    }

    return (
        <div className="profile-page">
            {userDetail &&
                userDetail.map((item, index) => (
                    <>
                        <div className="profile-card" key={index}>
                            <h3 className="profile-head">My Profile</h3>
                            <img src={item.profilePic} width={90} alt="profile pic" />
                            <h3 className="user-name">Username - {item.userName}</h3>
                            <span className="user-id">Id- {item.userId}</span>
                            <span className="user-email">Email - {item.userEmail}</span>

                            <span className="user-bio">"{item.userBio}"</span>
                            <Button onClick={logout} className="sub-ans" variant="light">Log-out</Button>
                        </div>
                        {/* <div className="profile-card data-card" >
                            <h4 className="question-head">My Questions</h4>
                            <h5>Q here is the question ?</h5>
                        </div> */}
                    </>
                ))
            }
        </div >
    )
}