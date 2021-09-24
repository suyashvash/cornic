import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import logo from '../assets/logo.png'
import { useState } from "react"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setActiveUser } from "../features/userSlice";
import PopupModal from "./popModal";

export default function SignIn(props: any) {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorLog, setErrorLog] = useState<string>('');

    const [popTitle, setPopTitle] = useState<string>('');
    const [popBody, setPopBody] = useState<any>('');

    const [show, setShow] = useState<boolean>(false);
    const auth = getAuth();
    const dispatch = useDispatch();

    const login = () => {
        if (email === '' || password === '') {
            setPopTitle("Login")
            setPopBody("Please fill all the fields !")
            setShow(true)
        }
        else {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    dispatch(setActiveUser({ userEmail: email, loggedIn: true, }))
                    props.history.push({ pathname: '/cornic-profile' });
                })
                .catch((error) => { setErrorLog(error.message) });
        }
    }


    const demoPop = () => {
        setPopTitle("Demo Login")
        setPopBody(<span>Id- demo@gmail.com <br /> Pass- demo123</span>)
        setShow(true)
    }

    return (
        <div className="login-page">
            <PopupModal
                show={show}
                onHide={() => setShow(false)}
                centered={true}
                title={popTitle}
                body={popBody} />

            <div className="cornic-poster">
                <img src={logo} alt="Corinic Poster" />
                <h3>Cornic</h3>
                <span>Ask the way you want !</span>
            </div>
            <div className="logger-div">
                <h3>Sign In</h3>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email</Form.Label>
                        <Form.Control onInputCapture={(e: any) => setEmail(e.target.value)} type="email" placeholder="John Doe" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Password </Form.Label>
                        <Form.Control onInputCapture={(e: any) => setPassword(e.target.value)} type="password" placeholder="****" />
                        {errorLog}
                    </Form.Group>
                    <Button onClick={login} className="sub-ans" variant="outline-primary" >Login</Button>
                    <Button className="sub-ans" href="cornic-signup" variant="secondary">Create Account</Button>
                    <Button onClick={demoPop} className="sub-ans" variant="outline-light" >Demo Account</Button>
                </Form>
            </div>
        </div >
    )
}