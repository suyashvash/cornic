import './index.css';
import './App.css';
import NavBar from './components/navBar';
import LeftBar from './components/leftBar';


function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="App-body">
        <LeftBar />
      </div>
    </div>
  );
}

export default App;
