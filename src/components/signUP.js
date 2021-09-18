import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import logo from '../assets/logo.png'
import userPic from '../assets/user.png'
import { useState } from "react"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { projectFirestore } from "../firebase/config";
import PopupModal from "./popModal"

export default function SignUpPage() {
    const [userName, setUserName] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorLog, setErrorLog] = useState('');
    const [show, setShow] = useState(false);
    const auth = getAuth();


    const signUp = () => {
        const time = Date.now();
        const myAnswers = [];
        const myQuestions = [];
        const savedQuestions = [];
        const data = {
            userName: userName,
            name: name,
            userEmail: email,
            profilePic: userPic,
            userBio: 'Hi, I am a corniac !',
            userId: `${userName}/${time}`,
            myAnswers: myAnswers,
            myQuestions: myQuestions,
            savedQuestions: savedQuestions,
        }

        if (email === '' || password === '') { alert("Please fill all the fields") }
        else {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    projectFirestore.collection("users").doc(`${email}`).set(data);
                    setShow(true);
                })
                .catch((error) => { const errorCode = error.code; const errorMessage = error.message; setErrorLog(errorMessage) });
        }
    }


    return (
        <div className="login-page">
            <div className="cornic-poster">
                <img src={logo} alt={"Cornic Poster"} />
                <h3>Cornic</h3>
                <span>Ask the way you want !</span>
            </div>


            <PopupModal
                show={show}
                onHide={() => setShow(false)}
                centered={true}
                title={"Sign Up"}
                body={"Account Created succcesfully !"} />



            <div className="logger-div">
                <h3>Sign Up</h3>
                <Form>
                    <div className="name-place">
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Username</Form.Label>
                            <Form.Control onInputCapture={(e) => setUserName(e.target.value)} type="name" placeholder="*Can't be changed !" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control onInputCapture={(e) => setName(e.target.value)} type="name" placeholder="John Doe" />
                        </Form.Group>

                    </div>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>Email </Form.Label>
                        <Form.Control onInputCapture={(e) => setEmail(e.target.value)} type="email" placeholder="johndoe@gmail.com" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
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