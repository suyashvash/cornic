import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { ImUser } from 'react-icons/im'
import { IoMdNotifications } from 'react-icons/io'
import logo from '../assets/logo.png'
import { FaPlus } from 'react-icons/fa'

export default function NavBar() {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/"> <span className="nav-head"> <img src={logo} alt="Cronic Logo" width={50} /> <h4>Cornic</h4></span></Navbar.Brand>
                <Nav>
                    <Nav.Item className="ml-auto">
                        <Nav.Link href="/cronic@ask"><FaPlus size={20} color={'white'} /></Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="ml-auto">

                        <Nav.Link href="/cronic@profile"><ImUser size={25} color={'white'} /></Nav.Link>
                    </Nav.Item>
                </Nav>
            </Container>
        </Navbar>
    )
}