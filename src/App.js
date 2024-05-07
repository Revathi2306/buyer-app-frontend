import './App.css';
import {Routes, Route} from 'react-router-dom';
import Homepage from './pages/Homepage';
import Contact from './pages/Contact';
import Login from './pages/Auth/Login';
import Profile from './pages/Profile';
import Signup from './pages/Auth/Signup';
import Orders from './pages/Orders';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Logout from './pages/Auth/Logout';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <>
    <Routes>
      <Route path='/login' element={<Login/> }/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/profile' element={<Profile/> }/>
      <Route path='/orders' element={<Orders/> }/>
      <Route path='/wishlist' element={<Wishlist/> }/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/product' element={<ProductDetail/>}/>
      <Route path='/' element={<Homepage/> }/>
      <Route path='/contact' element={<Contact/> }/>
      <Route path='/logout' element={<Logout/> }/>
    </Routes>
    </>
  );
}

export default App;
