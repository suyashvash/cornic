import './index.css';
import './App.css';
import NavBar from './components/navBar';
import LeftBar from './components/leftBar';
import MainBody from './components/mainBody';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SignIn from './components/signIn';
import Answer from './components/answer';
import AskQuestion from './components/ask';
import Profile from './components/profile';
import SignUpPage from './components/signUP';


import { useSelector } from "react-redux";
import { selectLoggedIN } from "../src/features/userSlice";

function App() {
  const loggedIn = useSelector(selectLoggedIN);

  return (
    <div className="App">


      <Router>
        <NavBar />
        <div className="App-body">
          <Switch>
            <Route path="/" exact component={() => <Lobby topic="general" />} />
            <Route path="/cornic@anime" exact component={() => <Lobby topic="anime" />} />
            <Route path="/cornic@gaming" exact component={() => <Lobby topic="gaming" />} />
            <Route path="/cornic@programming" exact component={() => <Lobby topic="programming" />} />
            <Route path="/cornic@movies" exact component={() => <Lobby topic="movies" />} />
            <Route path="/cornic@studies" exact component={() => <Lobby topic="studies" />} />
            <Route path="/cornic@profile" exact component={(props) => <Profile  {...props} />} />

            <Route path="/cornic@userlogin" exact component={(props) => loggedIn ? <Profile /> : <SignIn {...props} />} />
            <Route path="/cornic@signup" exact component={() => loggedIn ? <Profile /> : <SignUpPage />} />

            <Route path="/cornic@ask" exact component={() => <AskQuestion />} />
            <Route path="/cornic@postAnswer" exact component={() => <Answer />} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

const Lobby = ({ topic }) => {
  return (
    <>
      <LeftBar />
      <MainBody topic={topic} />
    </>

  )

}

export default App;
