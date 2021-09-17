import { useEffect, useState, useRef } from "react";
import { projectFirestore } from "../firebase/config";
import { selectUserEmail, setUserLogOutState } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { BiLogOut } from 'react-icons/bi';
import QuestionTab from "./questionBar";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default function Profile(props) {
    const userEmailRedux = useSelector(selectUserEmail);
    const [userDetail, setUserDetail] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => { getUserDetails() }, [])

    const getUserDetails = () => {
        let detail = [];
        const docRef = projectFirestore.collection('users').doc(`${userEmailRedux}`)
        docRef.onSnapshot((doc) => { detail.push(doc.data()); setUserDetail(detail); })
    }

    const logout = () => { dispatch(setUserLogOutState()); props.history.push({ pathname: '/' }); }

    return (
        <div className="profile-page">
            {userDetail.length !== 0 &&
                <>
                    <div className="profile-card">
                        <img src={userDetail[0].profilePic} width={100} alt="profile pic" />
                        <div className="profile-sub-head">
                            <h3 className="name">{userDetail[0].name}</h3>
                            <span className="user-bio">"{userDetail[0].userBio}"</span>
                            <h3 className="user-name">{userDetail[0].userName}</h3>
                            <span className="user-email">{userDetail[0].userEmail}</span>
                            <Button size={'sm'} onClick={logout} className="sub-ans log-out" variant="light"><BiLogOut size={20} /> Log out</Button>
                        </div>
                    </div>
                    <div className="data-card" >
                        <div className="profile-tab-holder">
                            <Tabs>
                                <TabList>
                                    <Tab>My Questions</Tab>
                                    <Tab>My Answers</Tab>
                                    <Tab>Stars</Tab>
                                </TabList>


                                <TabPanel>
                                    {userDetail[0].myQuestions &&
                                        userDetail[0].myQuestions.map((item, index) => (
                                            <QuestionTab
                                                key={index}
                                                questionBar={true}
                                                profileView={true}
                                                question={item.question}
                                                author={""}
                                                authorPic={""}
                                                time={""}
                                                questionId={item.id}

                                            />
                                        ))
                                    }

                                </TabPanel>
                                <TabPanel>
                                    {userDetail[0].myAnswers &&
                                        userDetail[0].myAnswers.map((item, index) => (
                                            <QuestionTab
                                                key={index}
                                                profileView={true}
                                                answerBar={true}
                                                question={item.question}
                                                answer={item.answer}
                                                questionId={item.id}

                                            />
                                        ))
                                    }
                                </TabPanel>
                                <TabPanel>
                                    <h4>Star / Saved Questions here</h4>
                                </TabPanel>
                            </Tabs>

                        </div>

                    </div>
                </>
            }
        </div >
    )
}