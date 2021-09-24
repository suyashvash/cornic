import './index.css';
import './App.scss';
import NavBar from './components/navBar';

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
import AboutPage from './components/about';


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
            <Route path="/" exact component={() => <MainBody topic={"Latest"} />} />
            <Route path="/general" exact component={() => <MainBody topic={"General"} />} />
            <Route path="/studies" exact component={() => <MainBody topic={"Studies"} />} />
            <Route path="/anime" exact component={() => <MainBody topic={"Anime"} />} />
            <Route path="/gaming" exact component={() => <MainBody topic={"Gaming"} />} />
            <Route path="/programming" exact component={() => <MainBody topic={"Programming"} />} />
            <Route path="/movies" exact component={() => <MainBody topic={"Movies"} />} />
            <Route path="/profile" exact component={(props: any) => <Profile  {...props} />} />
            <Route path="/login" exact component={(props: any) => loggedIn ? <Profile /> : <SignIn {...props} />} />
            <Route path="/signup" exact component={() => loggedIn ? <Profile /> : <SignUpPage />} />
            <Route path="/ask" exact component={(props: any) => loggedIn ? <AskQuestion /> : <SignIn {...props} />} />
            <Route path="/question" exact component={() => <Answer />} />
            <Route path="/about" exact component={() => <AboutPage />} />


          </Switch>
        </div>
      </Router>
    </div>
  );
}



export default App;
