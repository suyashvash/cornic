import QuestionTab from "./questionBar"
import { projectFirestore } from "../firebase/config";
import { useEffect, useState } from "react";
import { selectUserEmail, selectLoggedIN } from "../features/userSlice";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button"
import PopupModal from "./popModal";
import { useHistory } from "react-router-dom";

import { FaFilter } from 'react-icons/fa';

export default function MainBody(props: any) {

    const [questionPack, setQuestionPack] = useState<any>([]);
    const [userDetail, setUserDetail] = useState<any>([]);
    const [savedTrigger, setSavedTrigger] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);
    const [popBody, setPopBody] = useState<string>('');
    const [popTitle, setPopTitle] = useState<string>('');
    const [popChildren, setPopChildren] = useState<any>('');

    const history = useHistory()
    const userEmailRedux: any = useSelector(selectUserEmail);
    const loggedIn: any = useSelector(selectLoggedIN);
    const userRef = projectFirestore.collection('users').doc(`${userEmailRedux}`)

    const topicList = [
        { title: "General", link: "/cornic-general" },
        { title: "Studies", link: "/cornic-studies" },
        { title: "Anime", link: "/cornic-anime" },
        { title: "Gaming", link: "/cornic-gaming" },
        { title: "Programming", link: "/cornic-programming" },
        { title: "Movies", link: "/cornic-movies" },
    ]


    useEffect(() => { getQuestions(props.topic); getUserDetails() }, [savedTrigger])

    const getUserDetails = () => {
        let detail: any = [];
        userRef.onSnapshot((doc) => { detail.push(doc.data()); setUserDetail(detail); })
    }

    const dateFormater = (date: any) => { return new Date(date).toLocaleString() }

    const shareQuestion = (question: any, questionId: any) => {
        const formattedQuestion: any = question.replaceAll(' ', '-');
        navigator.clipboard.writeText(`cornic-ask.web.app/question?${formattedQuestion}/#${questionId}`)
        setPopTitle("Share question");
        setPopBody("Question URL copied to Clipboard !")
        setShow(true)
    }

    const checkSaved = (id: any) => {
        if (loggedIn) {
            if (userDetail[0]) {
                const checked = userDetail[0].savedQuestions.filter((item: any) => item.questionId === id)
                return (checked.length === 0 ? false : true)
            }
        } else { return false; }
    }



    const questionFilter = () => {
        setPopChildren(topicList.map((item: any, index: any) => (<a key={index} className="left-option" href={item.link} onClick={() => setShow(false)}> <h5>{item.title}</h5></a>)))
        setPopTitle("Filters")
        setShow(true)
    }

    const saveQuestion = (id: any, question: any) => {
        if (loggedIn) {
            if (checkSaved(id)) {
                setPopBody("Question is already saved ! Please visit profile to un-save it.");
                setPopTitle("Save question");
                setShow(true);
            }
            else {
                userRef.set(
                    { savedQuestions: [...userDetail[0].savedQuestions, { questionId: id, question: question }] },
                    { merge: true })
                setSavedTrigger(true)
            }
        } else { setPopBody("Please login before saving a Question !"); setPopTitle("Save question"); setShow(true) }

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
                title={popTitle}
                body={popBody}>
                {!loggedIn && popTitle === "Save question" && <Button onClick={() => history.push({ pathname: '/cornic-userlogin' })} className="sub-ans" variant="outline-primary" >Login</Button>}
                {popChildren}
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
                        shareQuestion={() => shareQuestion(item.userQuestion, item.questionId)}

                    />
                ))
            }

            <a onClick={questionFilter} className="floating-btn filter-btn"><FaFilter size={20} color={'white'} /></a>

        </div >
    )
}