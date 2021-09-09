import './index.css';
import './App.css';
import NavBar from './components/navBar';
import LeftBar from './components/leftBar';
import MainBody from './components/mainBody';


function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="App-body">
        <LeftBar />
        <MainBody />
      </div>
    </div>
  );
}

export default App;
