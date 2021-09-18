import QuestionTab from "./questionBar"
import { projectFirestore } from "../firebase/config";
import { useEffect, useState } from "react";
import { selectUserEmail, selectLoggedIN } from "../features/userSlice";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button"
import PopupModal from "./popModal";

export default function MainBody(props: any) {

    const [questionPack, setQuestionPack] = useState<any>([]);
    const [userDetail, setUserDetail] = useState<any>([]);
    const [savedTrigger, setSavedTrigger] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);
    const [popBody, setPopBody] = useState<string>('');

    const userEmailRedux: any = useSelector(selectUserEmail);
    const loggedIn: any = useSelector(selectLoggedIN);
    const userRef = projectFirestore.collection('users').doc(`${userEmailRedux}`)

    useEffect(() => { getQuestions(props.topic); getUserDetails() }, [savedTrigger])

    const getUserDetails = () => {
        let detail: any = [];
        userRef.onSnapshot((doc) => { detail.push(doc.data()); setUserDetail(detail); })
    }

    const dateFormater = (date: any) => { return new Date(date).toString() }

    const checkSaved = (id: any) => {
        if (loggedIn) {
            if (userDetail[0]) {
                const checked = userDetail[0].savedQuestions.filter((item: any) => item.questionId === id)
                return (checked.length === 0 ? false : true)
            }
        } else { return false; }
    }

    const saveQuestion = (id: any, question: any) => {
        if (loggedIn) {
            if (checkSaved(id)) {
                setPopBody("Question is already saved ! Please visit profile to un-save it.");
                setShow(true);
            }
            else {
                userRef.set(
                    { savedQuestions: [...userDetail[0].savedQuestions, { questionId: id, question: question }] },
                    { merge: true })
                setSavedTrigger(true)
            }
        } else { setPopBody("Please login before saving a Question !"); setShow(true) }

    }

    const getQuestions = (filter: any) => {
        let pack: any = [];
        const quesRef = projectFirestore.collection('questionBank')
        quesRef.orderBy("quesTime", "desc").get().then(querySnapshot => {
            querySnapshot.docs.forEach(doc => pack.push(doc.data()))
            if (props.topic !== "Latest") {
                const packed = pack.filter((item: any) => item.userTopic === filter);
                setQuestionPack(packed);
            }
            else { setQuestionPack(pack) }
        })
    }

    return (
        <div className="MainBody">

            <PopupModal
                show={show}
                onHide={() => setShow(false)}
                centered={false}
                title={"Save Question"}
                body={popBody}>
                {!loggedIn && <Button className="sub-ans" variant="outline-primary" >Login</Button>}

            </PopupModal>

            {
                questionPack &&
                questionPack.map((item: any, index: any) => (
                    < QuestionTab
                        key={index}
                        questionBar={true}
                        question={item.userQuestion}
                        author={item.author}
                        authorPic={item.authorPic}
                        time={dateFormater(item.quesTime)}
                        questionId={item.questionId}
                        profileView={false}
                        onSave={() => saveQuestion(item.questionId, item.userQuestion)}
                        saved={checkSaved(item.questionId)}

                    />
                ))
            }
        </div >
    )
}