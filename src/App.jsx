import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';

export default function App() {
  return <BrowserRouter>
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/sign-in' element={<Signin/>} />
    <Route path='/sign-up' element={<SignUp/>} />
    <Route path='/about' element={<About />} />
    <Route path='/Profile' element={<Profile />} />
  </Routes>
  </BrowserRouter>
        
  
}

