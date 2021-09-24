import logo from '../assets/logo.png'
import Button from 'react-bootstrap/Button'
import { FaReact } from 'react-icons/fa'
import { SiRedux, SiFirebase, SiBootstrap, SiJavascript, SiTypescript, SiSass, SiGithub, SiInstagram, SiLinkedin } from 'react-icons/si'


export default function AboutPage() {
    return (
        <div className="base-flex about-page">
            <div className="base-flex about-page-section about-div">
                <h3>What is Cornic ?</h3>
                <img src={logo} alt="Cornic Logo" width={250} />
                <p>Cornic is a social platform where anyone can ask questions and answer
                    other's. Cornic gives you ability to save and share question at your will.
                    It is an Open-Source Project made by Suyash vashishtha.
                    Is made using React ,Redux, Firebase, TypeSccrpt, JavaScript, Bootstrap and SASS

                </p>
                <div className="base-flex techs">
                    <FaReact size={28} />
                    <SiRedux size={28} />
                    <SiFirebase size={28} />
                    <SiBootstrap size={28} />
                    <SiJavascript size={28} />
                    <SiTypescript size={28} />
                    <SiSass size={28} />
                    <SiGithub size={28} />
                </div>

                <Button target="blank" href="https://github.com/suyashvash/cornic" className="sub-ans" variant="outline-light">Source Code</Button>
            </div>

            <div className="base-flex about-page-section about-creator">
                <img src="https://media-exp1.licdn.com/dms/image/C5603AQFBiC-fZDCrjQ/profile-displayphoto-shrink_800_800/0/1625217955187?e=1637798400&v=beta&t=CI9C-hGYxWd_49pzGKlYUMbmB0CyiOC7f4raYcrkilY" alt="" />
                <h4>Suyash Vashishtha</h4>
                <p>Hi ! I am Suyash Vashishtha, creator of this web-app. I am a Web and App developer
                    in React Js and React Native. I Love making webapps and mobile apps.                </p>
                <Button target="blank" href="https://suyashvashishtha.tech/" className="sub-ans" variant="outline-light">My Portfolio</Button>

                <div className="base-flex creator-links">
                    <a className="creator-a" href="https://github.com/suyashvash"><SiGithub size={28} /></a>
                    <a className="creator-a" href="https://www.linkedin.com/in/suyashvashishtha/"><SiLinkedin size={28} /> </a>
                    <a className="creator-a" href="https://www.instagram.com/suyash.codes/"> <SiInstagram size={28} /> </a>

                </div>
            </div>

        </div>
    )
}