import './App.css';
import {useState} from 'react'
import Test1 from './views/test1'
import Test2 from './views/test2'

function App() {
  const [test, setTest] = useState(1)
  return (
    <div className="App">
      {
        test === 1 ? <Test1 setTest={setTest}></Test1> : <Test2 setTest={setTest}></Test2>
      }
    </div>
  );
}

export default App;
