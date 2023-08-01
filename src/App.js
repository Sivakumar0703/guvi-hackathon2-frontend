
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './routes/homepage/Homepage';
import Mycart from './routes/cart/Mycart'
import Register from './routes/register/register';
import Login from './routes/login/login';
import Profile from './routes/profile/Profile';
import Admin from './routes/Admin/Admin';
import Adminproduct from './routes/Admin/Adminproduct';
import Adminonrental from './routes/Admin/Adminonrental';
import Adminaddproduct from './routes/Admin/Adminaddproduct';
import Adminedit from './routes/Admin/Adminedit';
import Contact from './routes/contact/Contact';
import Errorpage from './routes/errorPage/Errorpage';
import LandingPage from './routes/landingPage/LandingPage';

function App() {

  return (
    <div className="App">

      <BrowserRouter>

        <Routes>

          <Route path='/home' element={<HomePage />} />
          <Route path='/' element={<LandingPage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/cart' element={<Mycart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/admin/products' element={<Adminproduct />} />
          <Route path='/admin/addproducts' element={<Adminaddproduct />} />
          <Route path='/admin/editproduct/:id' element={<Adminedit />} />
          <Route path='/admin/onrent' element={<Adminonrental />} />
          <Route path='/contact_us' element={<Contact />} />
          <Route path='*' element={<Errorpage />} />

        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;


