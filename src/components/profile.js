import { useEffect, useState, useRef } from "react";
import { projectFirestore } from "../firebase/config";
import { selectUserEmail, setUserLogOutState } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { BiLogOut } from 'react-icons/bi';
import { RiEdit2Fill } from 'react-icons/ri';
import QuestionTab from "./questionBar";
import PopupModal from "./popModal";
import Form from "react-bootstrap/Form"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default function Profile(props) {
    const userEmailRedux = useSelector(selectUserEmail);
    const [userDetail, setUserDetail] = useState([]);
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const userRef = projectFirestore.collection('users').doc(`${userEmailRedux}`)

    useEffect(() => { getUserDetails() }, [show])

    const getUserDetails = () => {
        let detail = [];
        userRef.onSnapshot((doc) => { detail.push(doc.data()); setUserDetail(detail); })
        if (userDetail.length !== 0) { setName(userDetail[0].name); setBio(userDetail[0].userBio) }

    }

    const logout = () => { dispatch(setUserLogOutState()); props.history.push({ pathname: '/' }); }


    const saveProfile = () => {
        if (name !== "" && bio !== "") {
            userRef.update({ name: name, userBio: bio });
            setShow(false);
        } else {
            alert("Please fill the field before submitting !s")
        }

    }

    return (
        <div className="profile-page">
            {userDetail.length !== 0 &&
                <>
                    <PopupModal show={show} onHide={() => setShow(false)} centered={true} title={"Edit Profile"}>
                        <Form>
                            <div className="edit-img">
                                <img src={userDetail[0].profilePic} width={100} alt="profile pic" />
                                <Button size={'sm'} className="up-img" variant="primary">Upload</Button>
                            </div >
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Your Name </Form.Label>
                                <Form.Control value={name} onInputCapture={(e) => setName(e.target.value)} type="name" placeholder={userDetail[0].name} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Your Bio</Form.Label>
                                <Form.Control value={bio} onInputCapture={(e) => setBio(e.target.value)} as="textarea" rows={3} placeholder={userDetail[0].userBio} />
                            </Form.Group>
                            <Button size={'sm'} onClick={saveProfile} className="sub-ans log-out" variant="primary">Save Profile</Button>
                        </Form>
                    </PopupModal>



                    <div className="profile-card">
                        <img src={userDetail[0].profilePic} width={100} alt="profile pic" />
                        <div className="profile-sub-head">
                            <h3 className="name">{userDetail[0].name} </h3>
                            <span className="user-bio">"{userDetail[0].userBio}"</span>
                            <h3 className="user-name">{userDetail[0].userName}</h3>
                            <span className="user-email">{userDetail[0].userEmail}</span>
                            <div className="profile-options">
                                <Button size={'sm'} onClick={() => setShow(true)} className="sub-ans log-out" variant="light"><RiEdit2Fill size={20} />Edit Profile</Button>
                                <Button size={'sm'} onClick={logout} className="sub-ans log-out" variant="light"><BiLogOut size={20} /> Log out</Button>
                            </div>

                        </div>
                    </div>
                    <div className="data-card" >
                        <div className="profile-tab-holder">
                            <Tabs>
                                <TabList>
                                    <Tab>My Questions</Tab>
                                    <Tab>My Answers</Tab>
                                    <Tab>Saved</Tab>
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
                                    {userDetail[0].savedQuestions &&
                                        userDetail[0].savedQuestions
                                            .map((item, index) => (
                                                <QuestionTab
                                                    key={index}
                                                    questionBar={true}
                                                    profileView={true}
                                                    question={item.question}
                                                    author={""}
                                                    authorPic={""}
                                                    time={""}
                                                    questionId={item.questionId}
                                                />
                                            ))
                                    }
                                </TabPanel>
                            </Tabs>

                        </div>

                    </div>
                </>
            }
        </div >
    )
}