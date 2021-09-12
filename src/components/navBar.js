import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { ImUser } from 'react-icons/im'
import logo from '../assets/logo.png'
import { FaPlus } from 'react-icons/fa'
import { selectLoggedIN } from "../features/userSlice";
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function NavBar() {
    const loggedIn = useSelector(selectLoggedIN);

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Link to={{ pathname: "/" }}><span className="nav-head"> <img src={logo} alt="cornic Logo" width={50} /> <h4>Cornic</h4></span></Link>
                <Nav>
                    <Nav.Item className="ml-auto">
                        <Link className="ask-a-ques" to={{ pathname: "/cornic@ask" }}><FaPlus size={20} color={'white'} /></Link>
                    </Nav.Item>
                    <Nav.Item className="ml-auto">
                        {loggedIn ?
                            <Link to={{ pathname: "/cornic@profile" }}><ImUser size={25} color={'white'} /></Link>
                            :
                            <Link to={{ pathname: "/cornic@userlogin" }}><ImUser size={25} color={'white'} /></Link>
                        }
                    </Nav.Item>
                </Nav>
            </Container>
        </Navbar >
    )
}