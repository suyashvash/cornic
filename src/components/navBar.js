import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { ImUser } from 'react-icons/im'
import logo from '../assets/logo.png'
import { FaPlus } from 'react-icons/fa'
import { selectUserEmail } from "../features/userSlice";
import { useSelector } from 'react-redux'

export default function NavBar() {
    const userEmail = useSelector(selectUserEmail);

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/"> <span className="nav-head"> <img src={logo} alt="cornic Logo" width={50} /> <h4>Cornic</h4></span></Navbar.Brand>
                <Nav>
                    <Nav.Item className="ml-auto">
                        <Nav.Link href="/cornic@ask"><FaPlus size={20} color={'white'} /></Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="ml-auto">
                        <Nav.Link href={userEmail ? "cornic@profile" : "cornic@userlogin"}>
                            <ImUser size={25} color={'white'} />
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Container>
        </Navbar>
    )
}