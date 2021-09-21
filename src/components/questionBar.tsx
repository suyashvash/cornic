import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";
import { BsBookmark, BsFillBookmarkFill } from 'react-icons/bs';
import { FiShare2 } from 'react-icons/fi';



export default function QuestionTab(props: any) {
    const history = useHistory()

    const formattedQuestion: any = props.question.replaceAll(' ', '-');

    const goToAnswer = () => { history.push({ pathname: '/question', search: `?${formattedQuestion}/`, hash: `${props.questionId}` }); }




    return (
        <div className={props.profileView ? "base-flex questions profile-ques-view" : "base-flex questions"}  >
            {
                props.questionBar &&
                <div className="base-flex">
                    {!props.profileView && <img src={props.authorPic} alt="Author Profile Pic" width={40} className="author-img" />}
                    <div className="base-flex question-author">
                        <h4 className="question"> {props.question} </h4>
                        {!props.profileView && <span className="author">  {props.author} <span className="time-asked">{props.time}</span></span>}
                    </div>
                </div>
            }

            {
                props.answerBar &&
                <div className="base-flex">
                    <div className="base-flex question-author">
                        <h4 className="question"> {props.question} </h4>
                        <span className="answer-profile">  {props.answer}</span>
                    </div>
                </div>
            }

            <div className={props.profileView ? "base-flex ques-btn-holder profile-btn-view" : "base-flex ques-btn-holder"} >
                <Button onClick={goToAnswer} className="sub-ans" size={'sm'} variant="outline-primary">Answer</Button>
                {!props.profileView &&
                    <div className="opt">
                        <a className="sub-ans ques-option" onClick={props.shareQuestion}>
                            <FiShare2 size={22} />
                        </a>

                        <a className="sub-ans ques-option" onClick={props.onSave}>
                            {props.saved ? <BsFillBookmarkFill size={25} /> : <BsBookmark size={25} />}
                        </a>
                    </div>
                }
            </div>

        </div >
    )
}