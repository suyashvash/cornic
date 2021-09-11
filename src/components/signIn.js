import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import logo from '../assets/logo.png'
import { useState } from "react"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import {
    Link
} from "react-router-dom";

export default function SignIn(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorLog, setErrorLog] = useState('');
    const [userDetail, setUserDetail] = useState([])
    const auth = getAuth();







    // const setStore = () => {

    //     dispatch(login({
    //         name: userDetail.userName,
    //         email: userDetail.userEmail,
    //         name: userDetail.userName,
    //         id: userDetail.userId,
    //         profilePic: userDetail.profilePic,
    //         bio: userDetail.userBio,
    //     }));
    // }

    const login = () => {
        if (email == '' || password == '') { alert("Please fill all the fields") }
        else {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    props.history.push({ pathname: '/cornic@profile', state: { emailId: email } });
                })
                .catch((error) => { const errorCode = error.code; setErrorLog(error.message) });
        }
    }


    return (
        <div className="login-page">
            <div className="cornic-poster">
                <img src={logo} />
                <h3>Cornic</h3>
                <span>Ask the way you want !</span>
            </div>

            <div className="logger-div">

                <h3>Sign In</h3>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email</Form.Label>
                        <Form.Control onInputCapture={(e) => setEmail(e.target.value)} type="email" placeholder="John Doe" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Password </Form.Label>
                        <Form.Control onInputCapture={(e) => setPassword(e.target.value)} type="password" placeholder="****" />
                        {errorLog}
                    </Form.Group>


                    <Button onClick={login} className="sub-ans" variant="outline-primary" >Login</Button>
                    <Button className="sub-ans" href="cornic@signup" variant="secondary">Create Account</Button>
                </Form>

            </div>

        </div >
    )
}