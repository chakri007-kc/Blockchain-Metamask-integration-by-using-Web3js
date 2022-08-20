import {Route,Routes} from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
