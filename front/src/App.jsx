import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import Register from'./pages/Register'
import Home from './pages/home';
import Login from './pages/login';
import Matches from './pages/Matches'
import  Profile from './pages/Profile'
import Navbar from './components/Navbar';
import Chat from './pages/Chat';
import PrivateRoute from './routes/privateRoutes';
import UserProfile from './pages/UserProfile';


const PrivateLayout =()=>(
  <>
    <Navbar/>
    <Outlet /> 
  </>
)
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/register'element={<Register/>}/>

        <Route element={<PrivateRoute><PrivateLayout /></PrivateRoute>}>
         <Route path="/home" element={<Home />} />
         <Route path="/matches" element={<Matches/>} />
         <Route path="/profile" element={<Profile/>} />
         <Route path="/profile/:id" element={<UserProfile />} />
         <Route path="/chat/:id" element={<Chat />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
