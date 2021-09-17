import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";

export default function QuestionTab(props) {
    const history = useHistory()
    const goToAnswer = () => { history.push({ pathname: '/cornic@postAnswer', state: props }); }

    return (
        <div className="questions" >
            <div className="question" >
                <img src={props.authorPic} alt="Author Profile Pic" width={40} className="author-img" />
                <div className="question-author">
                    <h4 className="question"> {props.question} </h4>
                    <span className="author">  {props.author} <span className="time-asked">{props.time}</span></span>
                </div>
            </div>

            <Button onClick={goToAnswer} className="sub-ans" size={'sm'} variant="outline-primary">Answer</Button>
        </div >
    )
}