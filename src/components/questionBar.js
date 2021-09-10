import Button from 'react-bootstrap/Button'

import user from '../assets/admin.jpg'


export default function QuestionTab({ question, time, questionId, author }) {
    return (
        <div className="questions">
            <div className="question">
                <img src={user} alt="Author Profile Pic" width={40} className="author-img" />
                <div className="question-author">
                    <h4 className="question"> {question}</h4>
                    <span className="author">  {author} <span className="time-asked">{time}</span></span>

                </div>

            </div>
            {/* <div>
                <Badge className="topic-badge" pill bg="primary">Anime</Badge>
                <Badge className="topic-badge" pill bg="primary">Gaming</Badge>
                <Badge className="topic-badge" pill bg="primary">Movies</Badge>
            </div> */}

            <Button href={"/cronic@postAnswer"} className="sub-ans" size={'sm'} variant="outline-primary">Answer</Button>

        </div >
    )
}