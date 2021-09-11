import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { projectFirestore } from "../firebase/config";

export default function Profile(props) {

    const dispatch = useDispatch();
    const { state } = props.history.location;
    const [userDetail, setUserDetail] = useState([])

    useEffect(() => {
        getDetails()
    }, []);


    const getDetails = () => {
        let det = [];
        const docRef = projectFirestore.collection("users").doc(`${state.emailId}`);
        docRef.onSnapshot(doc => {
            det.push(doc.data())
            setUserDetail(det)
        })
    }
    return (
        <div>Profile {state.emailId} </div>
    )
}