import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { ImUser } from 'react-icons/im'
import { IoMdNotifications } from 'react-icons/io'
import logo from '../assets/logo.png'


export default function NavBar() {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home"> <spam className="nav-head"> <img src={logo} width={90} /> <h3>Cornic</h3></spam></Navbar.Brand>
                <Nav>
                    <Nav.Item className="ml-auto">
                        <Nav.Link href="#notifications" ><IoMdNotifications size={30} color={'grey'} /></Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="ml-auto">
                        <Nav.Link href="#profile"><ImUser size={30} color={'white'} /></Nav.Link>
                    </Nav.Item>
                </Nav>
            </Container>
        </Navbar>
    )
}