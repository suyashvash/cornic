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
import Login from './components/login';
import Answer from './components/answer';
import AskQuestion from './components/ask';


function App() {
  return (
    <div className="App">


      <Router>
        <NavBar />
        <div className="App-body">
          <LeftBar />
          <Switch>
            <Route path="/" exact component={() => <MainBody topic="general" />} />
            <Route path="/cronic@anime" exact component={() => <MainBody topic="anime" />} />
            <Route path="/cronic@gaming" exact component={() => <MainBody topic="gaming" />} />
            <Route path="/cronic@programming" exact component={() => <MainBody topic="programming" />} />
            <Route path="/cronic@movies" exact component={() => <MainBody topic="movies" />} />
            <Route path="/cronic@studies" exact component={() => <MainBody topic="studies" />} />
            <Route path="/cronic@profile" exact component={() => <Login />} />
            <Route path="/cronic@ask" exact component={() => <AskQuestion />} />
            <Route path="/cronic@postAnswer" exact component={() => <Answer />} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
