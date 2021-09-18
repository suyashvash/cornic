import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";
import { BsBookmark, BsFillBookmarkFill } from 'react-icons/bs';


export default function QuestionTab(props) {
    const history = useHistory()
    const goToAnswer = () => { history.push({ pathname: '/cornic@postAnswer', state: props.questionId }); }


    return (
        <div className={props.profileView ? "questions profile-ques-view" : "questions"}  >
            {
                props.questionBar &&
                <div className="question ">
                    {!props.profileView && <img src={props.authorPic} alt="Author Profile Pic" width={40} className="author-img" />}
                    <div className="question-author">
                        <h4 className="question"> {props.question} </h4>
                        {!props.profileView && <span className="author">  {props.author} <span className="time-asked">{props.time}</span></span>}
                    </div>
                </div>
            }

            {
                props.answerBar &&
                <div className="question ">
                    <div className="question-author">
                        <h4 className="question"> {props.question} </h4>
                        <span className="answer-profile">  {props.answer}</span>
                    </div>
                </div>
            }

            <div className={props.profileView ? "ques-btn-holder profile-btn-view" : "ques-btn-holder"} >
                <Button onClick={goToAnswer} className="sub-ans" size={'sm'} variant="outline-primary">Answer</Button>
                {!props.profileView &&
                    <>
                        <a className="sub-ans" onClick={props.onSave}>
                            {props.saved ? <BsFillBookmarkFill size={25} /> : <BsBookmark size={25} />}
                        </a></>
                }
            </div>

        </div >
    )
}