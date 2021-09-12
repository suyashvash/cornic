
import QuestionTab from "./questionBar"
import { projectFirestore } from "../firebase/config";
import { useEffect, useState } from "react";
import { FaPlus } from 'react-icons/fa'
import { Link } from "react-router-dom";

export default function MainBody({ topic }) {

    const [questionPack, setQuestionPack] = useState([]);

    useEffect(() => {
        getQuestions(topic)
    }, [])

    const dateFormater = (date) => {
        var newDate = new Date(date).toString();
        return newDate;
    }

    const getQuestions = (filter) => {
        let pack = [];
        const quesRef = projectFirestore.collection('questionBank')
        quesRef.orderBy("quesTime", "desc").get().then(querySnapshot => {
            querySnapshot.docs.map(doc => pack.push(doc.data()))
            if (topic != "Latest") {
                const packed = pack.filter(item => item.userTopic == filter)
                setQuestionPack(packed)
                console.log(questionPack.length)
            } else { setQuestionPack(pack) }
        })

    }



    return (
        <div className="MainBody">
            {questionPack &&
                questionPack.map((item, index) => (
                    <QuestionTab
                        key={index}
                        question={item.userQuestion}
                        author={item.author}
                        authorPic={item.authorPic}
                        time={dateFormater(item.quesTime)}
                        questionId={item.questionId}
                    />
                ))

            }
        </div>
    )
}