

import { RiEarthFill } from 'react-icons/ri'
import QuestionTab from "./questionBar"


export default function MainBody() {
    return (
        <div className="MainBody">
            <QuestionTab
                question={"What is plasma ?"}
                author={"Suyash"}
                time={"12:30 AM July"}
                questionId={"12123k34n2j34bh34b5"} />

            <QuestionTab
                question={"Who is Joe ?"}
                author={"Amamn"}
                time={"12:30 AM July"}
                questionId={"12123k34n2j34bh34b5"} />
            <QuestionTab
                question={"Who is Joe ?"}
                author={"Amamn"}
                time={"12:30 AM July"}
                questionId={"12123k34n2j34bh34b5"} />
            <QuestionTab
                question={"Who is Joe ?"}
                author={"Amamn"}
                time={"12:30 AM July"}
                questionId={"12123k34n2j34bh34b5"} />
        </div>
    )
}