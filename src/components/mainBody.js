import Card from "react-bootstrap/Card"
import logo from '../assets/logo.png'
import user from '../assets/admin.jpg'
import Story from "./story"


export default function MainBody() {
    return (
        <div className="MainBody">
            <div className="story-section">
                <h4>Astroids</h4>
                <div className="story-holder">
                    <Story userName="suyash.codes" userImage={user} />
                    <Story userName="suyash.codes" userImage={user} />
                    <Story userName="suyash.codes" userImage={user} />
                    <Story userName="suyash.codes" userImage={user} />
                    <Story userName="suyash.codes" userImage={user} />



                </div>
            </div>
        </div>
    )
}