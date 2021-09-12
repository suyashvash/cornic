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
    const questionDetails = history.location.state;
    const quesRef = projectFirestore.collection('questionBank').doc(questionDetails.questionId)
    const userEmailRedux = useSelector(selectUserEmail);

    useEffect(() => { getQuestion() }, [submit])

    const getQuestion = () => {
        let quesPack = [];
        quesRef.onSnapshot((doc) => { quesPack.push(doc.data()); setQuestionPack(quesPack) })
    }

    const submitAnswer = () => {
        if (answer === '') { alert("Please enter a answer") }
        else {
            setSubmit(!submit)
            quesRef.set(
                { answers: [...questionPack[0].answers, { answer: answer, by: `${userEmailRedux}` }] },
                { merge: true })
            setShow(true)
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
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <h2>{questionPack[0].userQuestion}</h2>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Label className="ques-des">{questionPack[0].questionDesc} </Form.Label>
                        </Form.Group>
                        {questionPack[0].answers &&
                            questionPack[0].answers.map((item, index) => (
                                <Form.Group key={index} className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Answers</Form.Label>
                                    <div className="ques-des ans-patch">
                                        <Form.Label>{item.answer} </Form.Label>
                                        <br />
                                        <Form.Label className="answer-author">{item.by} </Form.Label>
                                    </div>
                                </Form.Group>
                            ))
                        }
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Your Answer</Form.Label>
                            <Form.Control defaultValue={answer} onInputCapture={(e) => setAnswer(e.target.value)} as="textarea" rows={3} placeholder={"My answer is ..."} />
                        </Form.Group>
                    </Form>
                    <Button onClick={submitAnswer} className="sub-ans" variant="outline-primary" >Submit</Button>
                </> : <></>
            }
        </div>
    )
}