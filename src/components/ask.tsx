import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useState, useEffect } from "react";
import Dropdown from 'react-bootstrap/Dropdown'
import { projectFirestore } from "../firebase/config";
import { selectUserEmail } from "../features/userSlice";
import { useSelector } from "react-redux";
import PopupModal from "./popModal";

export default function AskQuestion() {

    const userEmailRedux = useSelector(selectUserEmail);

    const [topic, setTopic] = useState<string>('General');
    const [question, setQuestion] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [show, setShow] = useState<boolean>(false);
    const [userDetail, setUserDetail] = useState<any>([]);
    const [popBody, setPopBody] = useState<string>('');

    const userRef = projectFirestore.collection('users').doc(`${userEmailRedux}`)

    useEffect(() => { getUserDetails() }, [])

    const getUserDetails = () => {
        let detail: any = []; userRef.onSnapshot((doc) => { detail.push(doc.data()); setUserDetail(detail) })
    }

    const submitQuestion = () => {
        if (question !== '') {
            let answers: any = [];
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
            projectFirestore.collection("questionBank").doc(`${questionId}`).set(data);
            userRef.set(
                { myQuestions: [...userDetail[0].myQuestions, { question: question, id: `${questionId}` }] },
                { merge: true })

            setPopBody("Question Submitted Successfully !"); setShow(true); setQuestion(''); setDescription(''); setTopic('General');
        }
        else { setPopBody("Question is Empty !"); setShow(true) }
    }

    return (
        <div className="ask-question-page">
            <PopupModal
                show={show}
                onHide={() => setShow(false)}
                centered={false}
                title={"Question"}
                body={popBody} />

            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Your Question </Form.Label>
                    <Form.Control value={question} onInputCapture={(e: any) => setQuestion(e.target.value)} type="name" placeholder="What is capital of India ?" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description [Optional ]</Form.Label>
                    <Form.Control value={description} onInputCapture={(e: any) => setDescription(e.target.value)} as="textarea" rows={3} placeholder={"I think it is jaipur ! but I am not Confirmed "} />
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