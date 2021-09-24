import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { ImUser } from 'react-icons/im'
import logo from '../assets/logo.png'
import { FaPlus } from 'react-icons/fa'
import { selectLoggedIN } from "../features/userSlice";
import { useSelector } from "react-redux";
import { BsInfoCircleFill } from 'react-icons/bs';
import { AiFillHome } from 'react-icons//ai'

import { Link } from 'react-router-dom'



export default function NavBar() {
    const loggedIn = useSelector(selectLoggedIN);



    return (
        <>
            <Navbar className="fixed-top" bg="dark" variant="dark">
                <Container>
                    <Link to={{ pathname: "/" }}><span className="nav-head"> <img src={logo} alt="cornic Logo" width={50} /> <h4>Cornic</h4></span></Link>
                    <Nav>
                        <Nav.Item className="ml-auto">
                            <Link className="ask-a-ques" to={{ pathname: "/ask" }}><FaPlus size={20} color={'white'} /></Link>
                        </Nav.Item>
                        <Nav.Item className="ml-auto">
                            {loggedIn ?
                                <Link to={{ pathname: "/profile" }}><ImUser size={25} color={'white'} /></Link>
                                :
                                <Link to={{ pathname: "/login" }}><ImUser size={25} color={'white'} /></Link>
                            }
                        </Nav.Item>

                        <Nav.Item className="ml-auto">
                            <Link className="ask-a-ques" to={{ pathname: "/about" }}><BsInfoCircleFill size={20} color={'white'} /></Link>
                        </Nav.Item>

                    </Nav>
                </Container>
            </Navbar >



            <Navbar className="fixed-bottom" >

                <Nav className="bottom-bar-holder">
                    <Nav.Item>
                        <Link to={{ pathname: "/" }}>
                            <AiFillHome size={25} color={'white'} />
                        </Link>
                    </Nav.Item>

                    <Nav.Item className="ml-auto ask-hold">
                        <Link className="ask-a-ques btm" to={{ pathname: "/ask" }}><FaPlus size={25} color={'white'} /></Link>
                    </Nav.Item>
                    <Nav.Item className="ml-auto">
                        {loggedIn ?
                            <Link to={{ pathname: "/profile" }}><ImUser size={25} color={'white'} /></Link>
                            :
                            <Link to={{ pathname: "/login" }}><ImUser size={25} color={'white'} /></Link>
                        }
                    </Nav.Item>

                    <Nav.Item className="ml-auto">
                        <Link className="ask-a-ques" to={{ pathname: "/cornic-about" }}><BsInfoCircleFill size={20} color={'white'} /></Link>
                    </Nav.Item>

                </Nav>

            </Navbar >
        </>
    )
}