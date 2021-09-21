import './index.css';
import './App.scss';
import NavBar from './components/navBar';
import LeftBar from './components/leftBar';
import MainBody from './components/mainBody';
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";

import SignIn from './components/signIn';
import Answer from './components/answer';
import AskQuestion from './components/ask';
import Profile from './components/profile';
import SignUpPage from './components/signUP';


import { useSelector } from "react-redux";
import { selectLoggedIN } from "./features/userSlice";

function App() {
  const loggedIn = useSelector(selectLoggedIN);

  return (
    <div className="App">


      <Router>
        <NavBar />
        <div className="App-body">
          <Switch>
            <Route path="/" exact component={() => <Lobby topic="Latest" />} />
            <Route path="/cornic-general" exact component={() => <Lobby topic="General" />} />
            <Route path="/cornic-anime" exact component={() => <Lobby topic="Anime" />} />
            <Route path="/cornic-gaming" exact component={() => <Lobby topic="Gaming" />} />
            <Route path="/cornic-programming" exact component={() => <Lobby topic="Programming" />} />
            <Route path="/cornic-movies" exact component={() => <Lobby topic="Movies" />} />
            <Route path="/cornic-studies" exact component={() => <Lobby topic="Studies" />} />
            <Route path="/cornic-profile" exact component={(props: any) => <Profile  {...props} />} />
            <Route path="/cornic-userlogin" exact component={(props: any) => loggedIn ? <Profile /> : <SignIn {...props} />} />
            <Route path="/cornic-signup" exact component={() => loggedIn ? <Profile /> : <SignUpPage />} />
            <Route path="/cornic-ask" exact component={(props: any) => loggedIn ? <AskQuestion /> : <SignIn {...props} />} />
            <Route path="/question" exact component={() => <Answer />} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

const Lobby = (props: any) => {
  return (
    <>
      <LeftBar />
      <MainBody topic={props.topic} />
    </>

  )

}

export default App;
