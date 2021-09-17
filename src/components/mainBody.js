import QuestionTab from "./questionBar"
import { projectFirestore } from "../firebase/config";
import { useEffect, useState } from "react";

export default function MainBody({ topic }) {

    const [questionPack, setQuestionPack] = useState([]);

    useEffect(() => { getQuestions(topic) }, [])

    const dateFormater = (date) => { var newDate = new Date(date).toString(); return newDate; }

    const getQuestions = (filter) => {
        let pack = [];
        const quesRef = projectFirestore.collection('questionBank')
        quesRef.orderBy("quesTime", "desc").get().then(querySnapshot => {
            querySnapshot.docs.map(doc => pack.push(doc.data()))
            if (topic !== "Latest") { const packed = pack.filter(item => item.userTopic === filter); setQuestionPack(packed) }
            else { setQuestionPack(pack) }
        })
    }

    return (
        <div className="MainBody">
            {questionPack &&
                questionPack.map((item, index) => (
                    <QuestionTab
                        key={index}
                        questionBar={true}
                        question={item.userQuestion}
                        author={item.author}
                        authorPic={item.authorPic}
                        time={dateFormater(item.quesTime)}
                        questionId={item.questionId}
                        profileView={false}
                    />
                ))
            }
        </div>
    )
}