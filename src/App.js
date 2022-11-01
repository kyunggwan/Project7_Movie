import './App.css';
import Boxoffice from './boxoffice/Boxoffice';
import Boxmv from './boxoffice/Boxmv';
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Routes>
      <Route path ='/' element = {<Boxoffice />} />
      <Route path ='/mv' element = {<Boxmv />} />
    </Routes>
  );
}

export default App;
