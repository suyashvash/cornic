import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Modal from 'react-bootstrap/Modal'
import logo from '../assets/logo.png'
import userPic from '../assets/user.png'
import { useState } from "react"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { projectFirestore } from "../firebase/config";

export default function SignUpPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorLog, setErrorLog] = useState('');
    const [show, setShow] = useState(false);
    const auth = getAuth();

    const signUp = () => {
        const time = Date.now();
        const data = {
            userName: name,
            userEmail: email,
            profilePic: userPic,
            userBio: 'Hi, I am a corniac !',
            userId: `${name}/${time}`,


        }

        if (email == '' || password == '') { alert("Please fill all the fields") }
        else {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    const addUserProfile = projectFirestore.collection("users").doc(`${email}`).set(data);
                    setShow(true);
                })
                .catch((error) => { const errorCode = error.code; const errorMessage = error.message; setErrorLog(errorMessage) });
        }
    }


    return (
        <div className="login-page">
            <div className="cornic-poster">
                <img src={logo} />
                <h3>Cornic</h3>
                <span>Ask the way you want !</span>
            </div>

            <Modal show={show} onHide={() => setShow(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>Account Created succcesfully !</Modal.Body>

            </Modal>

            <div className="logger-div">
                <h3>Sign Up</h3>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Name</Form.Label>
                        <Form.Control onInputCapture={(e) => setName(e.target.value)} type="name" placeholder="John Doe" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email </Form.Label>
                        <Form.Control onInputCapture={(e) => setEmail(e.target.value)} type="email" placeholder="johndoe@gmail.com" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Password </Form.Label>
                        <Form.Control type="name" onInputCapture={(e) => setPassword(e.target.value)} />
                        {errorLog}
                    </Form.Group>

                    <Button className="sub-ans" variant="outline-primary" onClick={signUp} >Sign Up</Button>
                    <Button className="sub-ans" href="cornic@userlogin" variant="secondary">Login</Button>
                </Form>
            </div>
        </div>
    )
}