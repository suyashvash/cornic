import QuestionTab from "./questionBar"
import { projectFirestore } from "../firebase/config";
import { useEffect, useState } from "react";
import { selectUserEmail } from "../features/userSlice";
import { useSelector } from "react-redux";

export default function MainBody({ topic }) {

    const [questionPack, setQuestionPack] = useState([]);
    const userEmailRedux = useSelector(selectUserEmail);
    const [userDetail, setUserDetail] = useState([]);
    const [savedTrigger, setSavedTrigger] = useState(false);

    const userRef = projectFirestore.collection('users').doc(`${userEmailRedux}`)

    useEffect(() => { getQuestions(topic); getUserDetails() }, [savedTrigger])

    const getUserDetails = () => {
        let detail = [];
        userRef.onSnapshot((doc) => { detail.push(doc.data()); setUserDetail(detail); })
    }

    const dateFormater = (date) => { var newDate = new Date(date).toString(); return newDate; }

    const checkSaved = (id) => {
        const check = userDetail[0].savedQuestions
        const checked = check.filter((item) => item.questionId == id)
        return (checked.length == 0 ? false : true)
    }

    const saveQuestion = (id, question) => {
        if (checkSaved(id)) {
            alert("Question is already saved ! Please remove it from Profile !")
        } else {
            userRef.set(
                { savedQuestions: [...userDetail[0].savedQuestions, { questionId: id, question: question }] },
                { merge: true })
            setSavedTrigger(true)
        }
    }

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
            {questionPack && userDetail[0] &&
                questionPack.map((item, index) => (
                    < QuestionTab
                        key={index}
                        questionBar={true}
                        question={item.userQuestion}
                        author={item.author}
                        authorPic={item.authorPic}
                        time={dateFormater(item.quesTime)}
                        questionId={item.questionId}
                        profileView={false}
                        onSave={() => saveQuestion(item.questionId, item.userQuestion)}
                        saved={checkSaved(item.questionId)}
                    />
                ))
            }
        </div>
    )
}