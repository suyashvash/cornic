import QuestionTab from "./questionBar"
import { projectFirestore } from "../firebase/config";
import { useEffect, useState } from "react";
import { selectUserEmail, selectLoggedIN } from "../features/userSlice";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button"
import PopupModal from "./popModal";
import { useHistory } from "react-router-dom";
import { ImRocket } from 'react-icons/im'
import { FaFilter } from 'react-icons/fa';
import LoadingScreen from "./LoadingScreen";

export default function MainBody(props: any) {

    const [questionPack, setQuestionPack] = useState<any>([]);
    const [userDetail, setUserDetail] = useState<any>([]);
    const [reloadTrigger, setReloadTrigger] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);
    const [popBody, setPopBody] = useState<string>('');
    const [popTitle, setPopTitle] = useState<string>('');
    const [popChildren, setPopChildren] = useState<any>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const history = useHistory()
    const userEmailRedux = useSelector(selectUserEmail);
    const loggedIn = useSelector(selectLoggedIN);
    const userRef = projectFirestore.collection('users').doc(`${userEmailRedux}`)

    const topicList = [
        { title: "General", topic: "/general" },
        { title: "Studies", topic: "/studies" },
        { title: "Anime", topic: "/anime" },
        { title: "Gaming", topic: "/gaming" },
        { title: "Programming", topic: "/programming" },
        { title: "Movies", topic: "/movies" },
    ]

    useEffect(() => { getQuestions(props.topic); getUserDetails() }, [reloadTrigger])

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
        setPopChildren('')
        setShow(true)
    }

    const checkSaved = (id: any) => {
        if (loggedIn && userDetail[0]) {
            const checked = userDetail[0].savedQuestions.filter((item: any) => item.questionId === id)
            return (checked.length === 0 ? false : true)
        } else { return false; }
    }

    const topicSetter = (filterTopic: any) => { history.push({ pathname: filterTopic }) }

    const questionFilter = () => {
        setPopChildren(topicList.map((item: any, index: any) => (<a key={index} className="left-option" onClick={() => topicSetter(item.topic)}> <h5>{item.title}</h5></a >)))
        setPopTitle("Filters")
        setShow(true)
    }

    const saveQuestion = (id: any, question: any) => {
        if (loggedIn) {
            if (checkSaved(id)) {
                setPopBody("Question is already saved ! Please visit profile to un-save it.");
                setPopTitle("Save question");
                setPopChildren('');
                setShow(true);

            }
            else {
                userRef.set(
                    { savedQuestions: [...userDetail[0].savedQuestions, { questionId: id, question: question }] },
                    { merge: true })
                setReloadTrigger(true)
            }
        } else {
            setPopBody("Please login before saving a Question !");
            setPopTitle("Save question");
            setPopChildren(<Button onClick={() => history.push({ pathname: '/login' })} className="sub-ans" variant="outline-primary" >Login</Button>)
            setShow(true);

        }
    }

    const getQuestions = (filter: any) => {
        let pack: any = [];
        const quesRef = projectFirestore.collection('questionBank')
        quesRef.orderBy("quesTime", "desc").get().then(querySnapshot => {
            querySnapshot.docs.forEach(doc => pack.push(doc.data()))

            if (filter !== "Latest") {
                const packed = pack.filter((item: any) => item.userTopic === filter);
                setQuestionPack(packed);
            }
            else { setQuestionPack(pack) }
            setIsLoading(false)
        })
    }

    return (
        !isLoading ?
            <>
                <div className="left-bar">
                    <h5><ImRocket /> Suggested</h5>
                    {topicList.map((item: any, index: any) => (<a key={index} className="left-option" onClick={() => topicSetter(item.topic)} > <h5>{item.title}</h5></a>))}
                </div>
                <div className="base-flex MainBody">
                    <PopupModal
                        show={show}
                        onHide={() => setShow(false)}
                        centered={false}
                        title={popTitle}
                        body={popBody}>
                        {popChildren}
                    </PopupModal>

                    {
                        questionPack.length ?
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
                            :
                            <div className="base-flex no-questions-div">
                                <h3>No questions in {props.topic} section</h3>
                                <span>Start the discussion by asking one !</span>
                                <Button onClick={() => { history.push({ pathname: "/ask" }) }} className="sub-ans" size={'sm'} variant="outline-primary">Ask Question !</Button>
                            </div>

                    }
                    <a onClick={questionFilter} className="floating-btn filter-btn"><FaFilter size={20} color={'white'} /></a>
                </div >
            </>
            :
            <LoadingScreen />
    )
}