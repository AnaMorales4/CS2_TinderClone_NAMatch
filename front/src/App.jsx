import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Register from'./pages/Register'
import Home from './pages/home';
import Login from './pages/login';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/register'element={<Register/>}/>
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
