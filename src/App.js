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
import UserPage from './components/userpage';
import Answer from './components/answer';
import AskQuestion from './components/ask';


function App() {
  return (
    <div className="App">


      <Router>
        <NavBar />
        <div className="App-body">
          <Switch>
            <Route path="/" exact component={() => <Lobby topic="general" />} />
            <Route path="/cronic@anime" exact component={() => <Lobby topic="anime" />} />
            <Route path="/cronic@gaming" exact component={() => <Lobby topic="gaming" />} />
            <Route path="/cronic@programming" exact component={() => <Lobby topic="programming" />} />
            <Route path="/cronic@movies" exact component={() => <Lobby topic="movies" />} />
            <Route path="/cronic@studies" exact component={() => <Lobby topic="studies" />} />
            <Route path="/cronic@profile" exact component={() => <UserPage mode={"logged-in"} />} />
            <Route path="/cronic@ask" exact component={() => <AskQuestion />} />
            <Route path="/cronic@postAnswer" exact component={() => <Answer />} />
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
