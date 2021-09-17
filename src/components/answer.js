import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";
import Modal from 'react-bootstrap/Modal'
import { useHistory } from "react-router-dom";
import { selectUserEmail } from "../features/userSlice";
import { useSelector } from "react-redux";

export default function Answer(props) {

    const history = useHistory()
    const [answer, setAnswer] = useState('');
    const [show, setShow] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [questionPack, setQuestionPack] = useState([]);
    const [userDetail, setUserDetail] = useState([]);
    const quesId = history.location.state;
    const quesRef = projectFirestore.collection('questionBank').doc(quesId)
    const userEmailRedux = useSelector(selectUserEmail);
    const userRef = projectFirestore.collection('users').doc(`${userEmailRedux}`)

    useEffect(() => { getQuestion(); getUserDetails() }, [submit])

    const getQuestion = () => {
        let quesPack = [];
        quesRef.onSnapshot((doc) => { quesPack.push(doc.data()); setQuestionPack(quesPack) })
    }

    const getUserDetails = () => {
        let detail = [];
        userRef.onSnapshot((doc) => { detail.push(doc.data()); setUserDetail(detail) })
    }

    const submitAnswer = () => {
        if (answer === '') { alert("Please enter a answer") }
        else {
            setSubmit(!submit)
            quesRef.set(
                { answers: [...questionPack[0].answers, { answer: answer, by: `${userEmailRedux}` }] },
                { merge: true })

            userRef.set(
                { myAnswers: [...userDetail[0].myAnswers, { answer: answer, question: questionPack[0].userQuestion, id: `${questionPack[0].questionId}` }] },
                { merge: true })
            setShow(true)
            setAnswer('');
        }
    }

    return (
        <div className="ask-question-page">
            <Modal show={show} onHide={() => setShow(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Answer</Modal.Title>
                </Modal.Header>
                <Modal.Body>Answer Submitted Succesfully !</Modal.Body>
            </Modal>

            {questionPack.length !== 0 ?
                <>
                    <Form>
                        <div className="question-list">
                            <h2 className="question-asked">{questionPack[0].userQuestion}</h2>
                            <div className="ques-detail-holder"> <p>Asked by - {questionPack[0].author}</p> <p>Asked on -{questionPack[0].quesTime}</p>  <p>Topic -{questionPack[0].userTopic}</p>   </div>
                            <p >{questionPack[0].questionDesc} </p>
                        </div>
                        <div className="answer-list" >
                            <h5 className="answer-head">Answers</h5>
                            {questionPack[0].answers &&
                                questionPack[0].answers.map((item, index) => (
                                    <div className="answer-holder" key={index} >
                                        <p>{item.answer} </p>
                                        <p className="answer-author">{item.by} </p>
                                    </div>
                                ))
                            }
                        </div>
                        <Form.Group className="mb-3 sub-ans-holder" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Your Answer</Form.Label>
                            <Form.Control value={answer} onInputCapture={(e) => setAnswer(e.target.value)} as="textarea" rows={3} placeholder={"My answer is ..."} />
                        </Form.Group>
                    </Form>
                    <Button onClick={submitAnswer} className="sub-ans" variant="outline-primary" >Submit</Button>
                </> : <></>
            }
        </div>
    )
}