import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Register from'./pages/Register'
import Home from './pages/home';
import Login from './pages/login';
import Navbar from './components/Navbar';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/register'element={<Register/>}/>
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
