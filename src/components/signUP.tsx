import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import logo from '../assets/logo.png'
import userPic from '../assets/user.png'
import { useState } from "react"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { projectFirestore } from "../firebase/config";
import PopupModal from "./popModal"

export default function SignUpPage() {
    const [userName, setUserName] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorLog, setErrorLog] = useState<string>('');
    const [show, setShow] = useState<boolean>(false);
    const [popBody, setPopBody] = useState<string>('');
    const auth = getAuth();
    const userRef = projectFirestore.collection("users");




    const signUp = () => {
        const time = Date.now();
        const myAnswers: any = [];
        const myQuestions: any = [];
        const savedQuestions: any = [];
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

        if (email === '' || password === '' || userName === '') { setPopBody("Please fill all the fields"); setShow(true) }
        else {
            if (/\s/.test(userName)) {
                setPopBody("Please enter a username without spaces or /"); setShow(true)
            } else {
                // let detail: any = [];
                // userRef.onSnapshot((doc: any) => { detail.push(doc.data()) })
                createUserWithEmailAndPassword(auth, email, password)
                    .then(() => {
                        userRef.doc(`${email}`).set(data);
                        setShow(true);
                    })
                    .catch((error) => { const errorMessage = error.message; setErrorLog(errorMessage) });
            }

        }
    }


    return (
        <div className="login-page">
            <div className="cornic-poster">
                <img src={logo} alt={"Cornic Poster"} />
                <h3>Cornic</h3>
                <span>Ask the way you want !</span>
            </div>
            {console.log(userRef.doc())}

            <PopupModal
                show={show}
                onHide={() => setShow(false)}
                centered={true}
                title={"Sign Up"}
                body={popBody} />



            <div className="logger-div">
                <h3>Sign Up</h3>
                <Form>
                    <div className="base-flex name-place">
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Username</Form.Label>
                            <Form.Control onInputCapture={(e: any) => setUserName(e.target.value)} type="name" placeholder="*Can't be changed !" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control onInputCapture={(e: any) => setName(e.target.value)} type="name" placeholder="John Doe" />
                        </Form.Group>

                    </div>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>Email </Form.Label>
                        <Form.Control onInputCapture={(e: any) => setEmail(e.target.value)} type="email" placeholder="johndoe@gmail.com" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                        <Form.Label>Password </Form.Label>
                        <Form.Control type="name" onInputCapture={(e: any) => setPassword(e.target.value)} />
                        {errorLog}
                    </Form.Group>
                    <Button className="sub-ans" variant="outline-primary" onClick={signUp} >Sign Up</Button>
                    <Button className="sub-ans" href="cornic@userlogin" variant="secondary">Login</Button>
                </Form>
            </div>
        </div>
    )
}