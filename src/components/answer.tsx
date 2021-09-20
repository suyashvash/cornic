import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";
import { useHistory } from "react-router-dom";
import { selectUserEmail, selectLoggedIN } from "../features/userSlice";
import { useSelector } from "react-redux";
import PopupModal from "./popModal";

export default function Answer() {

    const history = useHistory()
    const [answer, setAnswer] = useState<any>('');
    const [show, setShow] = useState<boolean>(false);
    const [submit, setSubmit] = useState<boolean>(false);
    const [questionPack, setQuestionPack] = useState<any>([]);
    const [userDetail, setUserDetail] = useState<any>([]);
    const [popBody, setPopBody] = useState<string>('');

    const quesId: any = history.location.state;
    const quesRef = projectFirestore.collection('questionBank').doc(quesId)
    const userEmailRedux = useSelector(selectUserEmail);
    const userRef = projectFirestore.collection('users').doc(`${userEmailRedux}`)
    const loggedIn = useSelector(selectLoggedIN);

    useEffect(() => { getQuestion(); getUserDetails() }, [submit])

    const getQuestion = () => {
        let quesPack: any = [];
        quesRef.onSnapshot((doc) => { quesPack.push(doc.data()); setQuestionPack(quesPack) })
    }

    const getUserDetails = () => {
        if (loggedIn) {
            let detail: any = [];
            userRef.onSnapshot((doc) => { detail.push(doc.data()); setUserDetail(detail) })
        }
    }

    const loginRedirect = () => { history.push({ pathname: '/cornic-userlogin' }) }

    const submitAnswer = () => {
        if (loggedIn) {
            if (answer === '') { setPopBody("Answer can't be empty!"); setShow(true) }
            else {
                setSubmit(!submit)
                quesRef.set(
                    { answers: [...questionPack[0].answers, { answer: answer, by: `${userEmailRedux}` }] },
                    { merge: true })
                userRef.set(
                    { myAnswers: [...userDetail[0].myAnswers, { answer: answer, question: questionPack[0].userQuestion, id: `${questionPack[0].questionId}` }] },
                    { merge: true })
                setPopBody("Answer Submitted Sucessfully !"); setShow(true); setAnswer('');
            }
        }

    }

    return (
        <div className="ask-question-page">
            <PopupModal
                show={show}
                onHide={() => setShow(false)}
                centered={true}
                title={"Answer"}
                body={popBody} />

            {questionPack.length !== 0 ?
                <>
                    <Form>
                        <div className="question-list">
                            <h2 className="question-asked">{questionPack[0].userQuestion}</h2>
                            <div className="base-flex ques-detail-holder"> <p>Asked by - {questionPack[0].author}</p> <p>Asked on -{questionPack[0].quesTime}</p>  <p>Topic -{questionPack[0].userTopic}</p>   </div>
                            <p >{questionPack[0].questionDesc} </p>
                        </div>
                        <div className="answer-list" >
                            <h5 className="answer-head">Answers</h5>
                            {questionPack[0].answers &&
                                questionPack[0].answers.map((item: any, index: any) => (
                                    <div className="base-flex answer-holder" key={index} >
                                        <p>{item.answer} </p>
                                        <p className="answer-author">{item.by} </p>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="give-answer" >
                            {loggedIn ?
                                <>
                                    <Form.Group className="mb-3 sub-ans-holder" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Your Answer</Form.Label>
                                        <Form.Control value={answer} onInputCapture={(e: any) => setAnswer(e.target.value)} as="textarea" rows={3} placeholder={"My answer is ..."} />
                                    </Form.Group>
                                    <Button onClick={submitAnswer} className="sub-ans" variant="outline-primary" >Submit</Button>
                                </>
                                :
                                <Button className="sub-ans" onClick={loginRedirect} variant="outline-primary" >Login to answer</Button>
                            }
                        </div >
                    </Form>
                </> : <></>
            }
        </div >
    )
}