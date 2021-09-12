import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useState, useEffect } from "react";
import Dropdown from 'react-bootstrap/Dropdown'
import { projectFirestore } from "../firebase/config";
import { selectUserEmail } from "../features/userSlice";
import { useSelector } from "react-redux";
import Modal from 'react-bootstrap/Modal'

export default function AskQuestion() {

    const [topic, setTopic] = useState('General');
    const [question, setQuestion] = useState('');
    const [description, setDescription] = useState('');
    const [show, setShow] = useState(false);
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



    const submitQuestion = () => {
        if (question != '') {
            getUserDetails()
            let answers = [];
            const time = Date.now();
            const questionId = `${userDetail[0].userName}.${time}`
            const data = {
                userQuestion: question,
                questionDesc: description,
                userTopic: topic,
                questionId: questionId,
                author: userDetail[0].userName,
                authorPic: userDetail[0].profilePic,
                authorEmail: userDetail[0].userEmail,
                authorId: userDetail[0].userId,
                answers: answers,
                quesTime: time
            }
            const addQuestion = projectFirestore.collection("questionBank").doc(`${questionId}`).set(data);

            setShow(true);
            setQuestion('');
            setDescription('');
            setTopic('General');

        }
        else { alert("Question is Empty") }
    }

    return (
        <div className="ask-question-page">
            <Modal show={show} onHide={() => setShow(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Question</Modal.Title>
                </Modal.Header>
                <Modal.Body>Question Submitted Succesfully !</Modal.Body>
            </Modal>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Your Question </Form.Label>
                    <Form.Control value={question} onInputCapture={(e) => setQuestion(e.target.value)} type="name" placeholder="What is capital of India ?" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description [Optional ]</Form.Label>
                    <Form.Control value={description} onInputCapture={(e) => setDescription(e.target.value)} as="textarea" rows={3} placeholder={"I think it is jaipur ! but I am not Confirmed "} />
                </Form.Group>
                <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic"> Topic</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setTopic("Movies")} >Movies</Dropdown.Item>
                        <Dropdown.Item onClick={() => setTopic("Programming")} >Programming</Dropdown.Item>
                        <Dropdown.Item onClick={() => setTopic("Studies")} >Studies</Dropdown.Item>
                        <Dropdown.Item onClick={() => setTopic("Anime")} >Anime</Dropdown.Item>
                        <Dropdown.Item onClick={() => setTopic("Gaming")} >Gaming</Dropdown.Item>
                        <Dropdown.Item onClick={() => setTopic("General")} >General</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <h5 className="ask-topic">{topic}</h5>



            </Form>

            <Button className="sub-ans" variant="outline-primary" onClick={submitQuestion}>Submit</Button>
        </div>
    )
}