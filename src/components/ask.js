import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown'

export default function AskQuestion() {

    const [topic, setTopic] = useState('General');

    const [question, setQuestion] = useState('');
    const [description, setDescription] = useState('');


    const submitQuestion = () => {
        if (question != '') {
            alert(question + description + topic);
        }
        else {
            alert("Question is Empty")
        }

    }



    return (
        <div className="ask-question-page">
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Your Question </Form.Label>
                    <Form.Control onInputCapture={(e) => setQuestion(e.target.value)} type="name" placeholder="What is capital of India ?" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description [Optional ]</Form.Label>
                    <Form.Control onInputCapture={(e) => setDescription(e.target.value)} as="textarea" rows={3} placeholder={"I think it is jaipur ! but I am not Confirmed "} />
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

            <Button className="sub-ans" variant="outline-primary" onClick={submitQuestion}>Answer</Button>
        </div>
    )
}